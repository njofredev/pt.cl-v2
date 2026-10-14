import { NextRequest, NextResponse } from 'next/server';
import { getDisponibilidad, getSucursales } from '@/lib/healthatom/client';
import { HealthatomPlatform } from '@/lib/healthatom/types';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = (searchParams.get('platform') || 'dentalink') as HealthatomPlatform;
    const branchParam = searchParams.get('id_sucursal');
    const sucursalesParam = searchParams.get('id_sucursales'); // Ej: "1,2"
    const id_profesional = parseInt(searchParams.get('id_profesional') || '', 10);

    if (isNaN(id_profesional) || id_profesional <= 0) {
      return NextResponse.json(
        { error: 'El parámetro "id_profesional" es obligatorio y debe ser numérico.' },
        { status: 400 }
      );
    }

    let branchList: number[] = [];
    if (branchParam && branchParam !== 'all' && !isNaN(parseInt(branchParam, 10))) {
      branchList = [parseInt(branchParam, 10)];
    } else if (sucursalesParam) {
      branchList = sucursalesParam
        .split(',')
        .map((s) => parseInt(s.trim(), 10))
        .filter((n) => !isNaN(n) && n > 0);
    }

    if (branchList.length === 0) {
      const allBranches = await getSucursales(platform);
      branchList = allBranches.map((s) => s.id);
    }

    const today = new Date();
    const defaultStart = today.toISOString().split('T')[0];
    const defaultEnd = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];

    const fecha_inicio = searchParams.get('fecha_inicio') || defaultStart;
    const fecha_fin = searchParams.get('fecha_fin') || defaultEnd;

    // Consultar disponibilidad en paralelo para todas las sedes requeridas
    const availabilityPromises = branchList.map((bId) =>
      getDisponibilidad(platform, bId, id_profesional, fecha_inicio, fecha_fin)
    );
    const branchResults = await Promise.all(availabilityPromises);

    // Unificar disponibilidad por fecha
    const dayMap = new Map<string, { fecha: string; total_disponibles: number; slots: any[] }>();

    branchResults.forEach((branchAvail) => {
      branchAvail.forEach((day) => {
        if (!dayMap.has(day.fecha)) {
          dayMap.set(day.fecha, {
            fecha: day.fecha,
            total_disponibles: 0,
            slots: [],
          });
        }
        const existing = dayMap.get(day.fecha)!;
        existing.slots.push(...day.slots);
        existing.total_disponibles = existing.slots.length;
      });
    });

    const availability = Array.from(dayMap.values())
      .map((d) => ({
        ...d,
        slots: d.slots.sort((a, b) => a.hora.localeCompare(b.hora)),
      }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));

    // Encontrar el próximo slot disponible
    let nextAvailableSlot: { fecha: string; hora: string; periodo: string } | null = null;
    for (const day of availability) {
      if (day.slots && day.slots.length > 0) {
        nextAvailableSlot = {
          fecha: day.fecha,
          hora: day.slots[0].hora,
          periodo: day.slots[0].periodo,
        };
        break;
      }
    }

    // Si no hay horas en esta ventana, buscar en los siguientes 14 días para dar feedback útil
    if (!nextAvailableSlot && !searchParams.get('no_lookahead')) {
      const lookaheadStart = new Date(new Date(fecha_fin).getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      const lookaheadEnd = new Date(new Date(fecha_fin).getTime() + 15 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];

      try {
        const lookaheadPromises = branchList.map((bId) =>
          getDisponibilidad(platform, bId, id_profesional, lookaheadStart, lookaheadEnd)
        );
        const lookaheadBranchResults = await Promise.all(lookaheadPromises);
        const lookaheadDays = lookaheadBranchResults.flat().sort((a, b) => a.fecha.localeCompare(b.fecha));

        for (const day of lookaheadDays) {
          if (day.slots && day.slots.length > 0) {
            nextAvailableSlot = {
              fecha: day.fecha,
              hora: day.slots[0].hora,
              periodo: day.slots[0].periodo,
            };
            break;
          }
        }
      } catch (e) {
        // Ignorar fallo secundario de lookahead
      }
    }

    return NextResponse.json({
      success: true,
      platform,
      id_sucursal: branchList.length === 1 ? branchList[0] : 'all',
      sucursales_consultadas: branchList,
      id_profesional,
      fecha_inicio,
      fecha_fin,
      total_dias_con_horas: availability.length,
      next_available_slot: nextAvailableSlot,
      availability,
    });
  } catch (error: any) {
    console.error('[API Availability] Error:', error);
    return NextResponse.json(
      { error: 'Error al consultar disponibilidad horaria.', details: error.message },
      { status: 500 }
    );
  }
}
