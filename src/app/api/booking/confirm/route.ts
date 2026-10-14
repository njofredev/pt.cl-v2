import { NextRequest, NextResponse } from 'next/server';
import { agendarCita, crearPaciente, actualizarPaciente, getSucursales } from '@/lib/healthatom/client';
import { verifyPatientToken } from '@/lib/healthatom/token';
import { isValidChileanRut, formatRutForHealthatom } from '@/lib/healthatom/rut';
import { generateGoogleCalendarUrl, generateICSContent } from '@/lib/healthatom/calendar';
import { HealthatomPlatform } from '@/lib/healthatom/types';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      platform = 'dentalink',
      id_sucursal,
      id_profesional,
      id_sillon,
      fecha,
      hora_inicio,
      duracion = 30,
      comentarios,
      motivo_consulta,
      patient_token,
      new_patient,
      profesional_nombre = 'Profesional Médico',
      especialidad = 'Atención Médica',
      sucursal_nombre = 'Policlínico Tabancura',
    } = body;

    const validPlatform = (platform === 'medilink' ? 'medilink' : 'dentalink') as HealthatomPlatform;

    if (!id_sucursal || !id_profesional || !id_sillon || !fecha || !hora_inicio) {
      return NextResponse.json(
        { error: 'Faltan parámetros obligatorios de la cita (sucursal, profesional, sillón, fecha u hora).' },
        { status: 400 }
      );
    }

    let patientId: number | null = null;
    let patientFullName = '';
    let patientEmail = '';

    // 1. Caso Paciente con Token firmado verificado
    if (patient_token) {
      const verified = verifyPatientToken(patient_token);
      if (!verified) {
        return NextResponse.json(
          { error: 'La sesión del paciente ha caducado o es inválida. Por favor, revalida tu RUT.' },
          { status: 401 }
        );
      }
      patientId = verified.id_paciente;
      patientFullName = `${verified.nombre} ${verified.apellidos}`.trim();
      patientEmail = verified.email || '';

      // Si el paciente actualizó su correo o teléfono antes de agendar
      if (new_patient?.email || new_patient?.celular) {
        await actualizarPaciente(validPlatform, patientId, {
          email: new_patient.email || undefined,
          celular: new_patient.celular || undefined,
        });
        if (new_patient.email) patientEmail = new_patient.email;
      }
    }
    // 2. Caso Paciente Nuevo
    else if (new_patient) {
      if (!new_patient.rut || !new_patient.nombre || !new_patient.apellidos || !new_patient.email || !new_patient.celular) {
        return NextResponse.json(
          { error: 'Para registrar un nuevo paciente se requiere RUT, Nombre, Apellidos, Email y Celular.' },
          { status: 400 }
        );
      }

      if (!isValidChileanRut(new_patient.rut)) {
        return NextResponse.json(
          { error: 'El RUT del paciente no es válido según el algoritmo chileno (Módulo 11).' },
          { status: 422 }
        );
      }

      const created = await crearPaciente(validPlatform, {
        rut: formatRutForHealthatom(new_patient.rut),
        nombre: new_patient.nombre.trim(),
        apellidos: new_patient.apellidos.trim(),
        email: new_patient.email.trim(),
        celular: new_patient.celular.trim(),
        fecha_nacimiento: new_patient.fecha_nacimiento,
        id_prevision: new_patient.id_prevision ? parseInt(new_patient.id_prevision, 10) : undefined,
      });

      if (!created || !created.id) {
        return NextResponse.json(
          { error: 'No fue posible registrar los datos del paciente en el sistema médico.' },
          { status: 502 }
        );
      }

      patientId = created.id;
      patientFullName = `${created.nombre} ${created.apellidos}`.trim();
      patientEmail = created.email || new_patient.email;
    } else {
      return NextResponse.json(
        { error: 'Se requiere identificación del paciente para confirmar la cita.' },
        { status: 400 }
      );
    }

    // 3. Crear la Cita en Healthatom (/citas con id_estado: 29)
    const bookingResult = await agendarCita(validPlatform, {
      id_paciente: patientId,
      id_profesional: parseInt(id_profesional, 10),
      id_sucursal: parseInt(id_sucursal, 10),
      id_sillon: parseInt(id_sillon, 10),
      fecha,
      hora_inicio,
      duracion: parseInt(duracion, 10) || 30,
      comentarios:
        comentarios ||
        (motivo_consulta
          ? `[Motivo: ${motivo_consulta}] Agendado vía Web (${patientFullName})`
          : `Agendamiento Web (${patientFullName})`),
    });

    if (!bookingResult.success || !bookingResult.id_cita) {
      return NextResponse.json(
        {
          error:
            bookingResult.error ||
            'El bloque horario seleccionado ya no se encuentra disponible. Por favor elige otro horario.',
        },
        { status: 409 }
      );
    }

    const folio = `PT-${validPlatform === 'dentalink' ? 'DNT' : 'MED'}-${bookingResult.id_cita}`;

    // 4. Preparar eventos de calendario
    let branchLocation = sucursal_nombre;
    try {
      const branches = await getSucursales(validPlatform);
      const bInfo = branches.find((b) => b.id === parseInt(id_sucursal, 10));
      if (bInfo) {
        const cleanDir = (bInfo.direccion || '').replace(/^RUT:\s*[\d.-]+\s*-\s*/i, '').trim();
        branchLocation = [cleanDir, bInfo.comuna, bInfo.ciudad].filter(Boolean).join(', ') || bInfo.nombre;
      }
    } catch (e) {
      // Ignorar fallo de geocodificación secundaria
    }

    const calendarEvent = {
      title: `Cita Médica: ${especialidad} - Policlínico Tabancura`,
      description: `Cita médica confirmada con Dr(a). ${profesional_nombre}.\nFolio: ${folio}\nMotivo: ${motivo_consulta || 'Consulta clínica'}\nPaciente: ${patientFullName}\nSede: ${sucursal_nombre}\nFecha: ${fecha} a las ${hora_inicio}`,
      location: branchLocation,
      startDate: fecha,
      startTime: hora_inicio,
      durationMinutes: parseInt(duracion, 10) || 30,
    };

    const googleCalendarUrl = generateGoogleCalendarUrl(calendarEvent);
    const icsContent = generateICSContent(calendarEvent);

    return NextResponse.json({
      success: true,
      id_cita: bookingResult.id_cita,
      folio,
      fecha,
      hora_inicio: hora_inicio.slice(0, 5),
      profesional_nombre,
      especialidad,
      motivo_consulta: motivo_consulta || 'Primera consulta / Diagnóstico y evaluación',
      sucursal_nombre,
      paciente_nombre: patientFullName,
      paciente_email: patientEmail,
      google_calendar_url: googleCalendarUrl,
      ics_content: icsContent,
    });
  } catch (error: any) {
    console.error('[API Confirm] Error:', error);
    return NextResponse.json(
      { error: 'Fallo al procesar la confirmación de la cita.', details: error.message },
      { status: 500 }
    );
  }
}
