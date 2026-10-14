import { NextRequest, NextResponse } from 'next/server';
import {
  getSucursales,
  getEspecialidades,
  getProfesionales,
  getPrevisiones,
} from '@/lib/healthatom/client';
import { HealthatomPlatform } from '@/lib/healthatom/types';
import { getDoctorPhoto } from '@/lib/healthatom/photos';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platformParam = searchParams.get('platform') || 'dentalink';

    if (platformParam !== 'dentalink' && platformParam !== 'medilink') {
      return NextResponse.json(
        { error: 'Plataforma no válida. Debe ser "dentalink" o "medilink".' },
        { status: 400 }
      );
    }

    const platform = platformParam as HealthatomPlatform;

    const [sucursales, especialidades, profesionales, previsiones] = await Promise.all([
      getSucursales(platform),
      getEspecialidades(platform),
      getProfesionales(platform),
      getPrevisiones(platform),
    ]);

    // Crear mapa de especialidades para enriquecer profesionales si falta nombre
    const espMap = new Map<number, string>();
    especialidades.forEach((e) => espMap.set(e.id, e.nombre));

    const cleanProfesionales = profesionales.map((p) => {
      const especialidadNombre =
        p.especialidad || (p.id_especialidad ? espMap.get(p.id_especialidad) : '') || 'General';
      const fullName = `${p.nombre.trim()} ${p.apellidos.trim()}`;

      // Extraer todas las sucursales donde el profesional tiene contrato u horarios
      const branchIdsSet = new Set<number>();
      if (p.id_sucursal) branchIdsSet.add(Number(p.id_sucursal));
      if (Array.isArray(p.horarios_sucursal)) {
        p.horarios_sucursal.forEach((h: any) => {
          const num = Number(h);
          if (!isNaN(num) && num > 0) branchIdsSet.add(num);
        });
      }
      if (Array.isArray(p.contratos_sucursal)) {
        p.contratos_sucursal.forEach((c: any) => {
          const num = Number(c);
          if (!isNaN(num) && num > 0) branchIdsSet.add(num);
        });
      }

      return {
        id: p.id,
        nombre: p.nombre.trim(),
        apellidos: p.apellidos.trim(),
        nombreCompleto: fullName,
        imageUrl: getDoctorPhoto(fullName),
        id_especialidad: p.id_especialidad,
        especialidad: especialidadNombre,
        id_sucursal: p.id_sucursal,
        sucursales_ids: Array.from(branchIdsSet),
        intervalo: p.intervalo || 30,
        agenda_online: p.agenda_online,
      };
    });

    return NextResponse.json({
      success: true,
      platform,
      sucursales,
      especialidades,
      profesionales: cleanProfesionales,
      previsiones,
    });
  } catch (error: any) {
    console.error('[API Catalog] Error:', error);
    return NextResponse.json(
      { error: 'Error al consultar catálogo de agendamiento.', details: error.message },
      { status: 500 }
    );
  }
}
