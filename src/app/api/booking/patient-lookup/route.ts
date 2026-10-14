import { NextRequest, NextResponse } from 'next/server';
import { isValidChileanRut, formatRutForHealthatom } from '@/lib/healthatom/rut';
import { buscarOSincronizarPaciente } from '@/lib/healthatom/client';
import { createPatientToken, sanitizePatientForResponse } from '@/lib/healthatom/token';
import { HealthatomPlatform } from '@/lib/healthatom/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rut, platform = 'dentalink' } = body;

    if (!rut || typeof rut !== 'string') {
      return NextResponse.json(
        { error: 'El RUT es obligatorio.' },
        { status: 400 }
      );
    }

    if (!isValidChileanRut(rut)) {
      return NextResponse.json(
        { error: 'El RUT ingresado no es válido según el algoritmo chileno (Módulo 11).' },
        { status: 422 }
      );
    }

    const cleanRut = formatRutForHealthatom(rut);
    const validPlatform = (platform === 'medilink' ? 'medilink' : 'dentalink') as HealthatomPlatform;

    // Buscar en plataforma y ejecutar Cross-Sync con la plataforma hermana si corresponde
    const { paciente } = await buscarOSincronizarPaciente(validPlatform, cleanRut);

    if (!paciente) {
      return NextResponse.json({
        exists: false,
        formatted_rut: cleanRut,
      });
    }

    // Paciente encontrado: generar token firmado seguro y enmascarar datos personales
    const patientToken = createPatientToken({
      id_paciente: paciente.id,
      platform: validPlatform,
      rut: cleanRut,
      nombre: paciente.nombre,
      apellidos: paciente.apellidos,
      email: paciente.email,
      celular: paciente.celular || paciente.telefono,
    });

    const maskedData = sanitizePatientForResponse(paciente);

    return NextResponse.json({
      exists: true,
      patient_token: patientToken,
      masked_data: maskedData,
    });
  } catch (error: any) {
    console.error('[API Patient Lookup] Error:', error);
    return NextResponse.json(
      { error: 'Error al consultar paciente en el sistema.', details: error.message },
      { status: 500 }
    );
  }
}
