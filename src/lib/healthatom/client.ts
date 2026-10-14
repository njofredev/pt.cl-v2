import {
  HealthatomPlatform,
  HealthatomSucursal,
  HealthatomEspecialidad,
  HealthatomProfesional,
  HealthatomPrevision,
  HealthatomPaciente,
  CleanSlot,
  DayAvailability,
} from './types';
import { formatRutForHealthatom } from './rut';

function getAuthConfig(platform: HealthatomPlatform) {
  const token =
    platform === 'dentalink'
      ? process.env.DENTALINK_API_TOKEN
      : process.env.MEDILINK_API_TOKEN;

  const baseUrl =
    platform === 'dentalink'
      ? process.env.DENTALINK_API_URL || 'https://api.dentalink.healthatom.com/api/v1'
      : process.env.MEDILINK_API_URL || 'https://api.medilink.healthatom.com/api/v1';

  if (!token) {
    throw new Error(`Token de autenticación no configurado en variables de entorno para ${platform}`);
  }

  const cleanToken = token.replace(/^Token\s+/i, '').trim();

  return {
    baseUrl: baseUrl.replace(/\/+$/, ''),
    headers: {
      Authorization: `Token ${cleanToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
}

/**
 * Realiza una petición GET paginada completa recolectando los registros de data
 */
async function fetchPaginatedList<T>(
  platform: HealthatomPlatform,
  initialUrl: string,
  revalidateSeconds: number = 3600
): Promise<T[]> {
  const { headers } = getAuthConfig(platform);
  let currentUrl: string | null = initialUrl;
  const results: T[] = [];
  let pageCount = 0;
  const maxPages = 10; // límite de seguridad

  while (currentUrl && pageCount < maxPages) {
    pageCount++;
    try {
      const res: Response = await fetch(currentUrl, {
        method: 'GET',
        headers,
        next: { revalidate: revalidateSeconds },
      });

      if (!res.ok) {
        console.error(`[Healthatom] Error fetching ${currentUrl}: HTTP ${res.status}`);
        break;
      }

      const json: any = await res.json();
      const pageData: T[] = Array.isArray(json.data) ? json.data : [];
      results.push(...pageData);

      if (json.links && json.links.next && json.links.next !== currentUrl) {
        currentUrl = json.links.next;
      } else {
        currentUrl = null;
      }
    } catch (err) {
      console.error(`[Healthatom] Request failed for ${currentUrl}:`, err);
      break;
    }
  }

  return results;
}

// -------------------------------------------------------------
// Catálogos Base
// -------------------------------------------------------------

/**
 * Obtiene las sucursales activas del centro médico
 */
export async function getSucursales(platform: HealthatomPlatform): Promise<HealthatomSucursal[]> {
  const { baseUrl } = getAuthConfig(platform);
  const data = await fetchPaginatedList<HealthatomSucursal>(
    platform,
    `${baseUrl}/sucursales`,
    3600 * 12
  );
  // Filtrar habilitadas si el campo está presente
  return data.filter((s) => s.habilitado === undefined || s.habilitado === 1);
}

/**
 * Obtiene las especialidades disponibles
 */
export async function getEspecialidades(
  platform: HealthatomPlatform
): Promise<HealthatomEspecialidad[]> {
  const { baseUrl } = getAuthConfig(platform);
  const data = await fetchPaginatedList<HealthatomEspecialidad>(
    platform,
    `${baseUrl}/especialidades`,
    3600 * 12
  );
  return data;
}

/**
 * Obtiene los profesionales habilitados para agendamiento online
 */
export async function getProfesionales(
  platform: HealthatomPlatform
): Promise<HealthatomProfesional[]> {
  const { baseUrl } = getAuthConfig(platform);
  // Dentalink utiliza /dentistas mientras que Medilink utiliza /profesionales
  const resource = platform === 'dentalink' ? 'dentistas' : 'profesionales';
  const data = await fetchPaginatedList<HealthatomProfesional>(
    platform,
    `${baseUrl}/${resource}`,
    3600 * 6
  );

  // Filtrar profesionales habilitados para agenda
  return data.filter(
    (p) => (p.habilitado === undefined || p.habilitado === 1) && (p.agenda_online === undefined || p.agenda_online === 1)
  );
}

/**
 * Obtiene las previsiones de salud disponibles
 */
export async function getPrevisiones(platform: HealthatomPlatform): Promise<HealthatomPrevision[]> {
  const { baseUrl } = getAuthConfig(platform);
  try {
    const data = await fetchPaginatedList<HealthatomPrevision>(
      platform,
      `${baseUrl}/previsiones`,
      3600 * 24
    );
    return data;
  } catch {
    return [];
  }
}

// -------------------------------------------------------------
// Motor de Disponibilidad Horaria (/agendas)
// -------------------------------------------------------------

export function parseAvailableSlots(rawAgendaData: any, branchId?: number): DayAvailability[] {
  if (!rawAgendaData) return [];

  const rawFechas = rawAgendaData.fechas || rawAgendaData.data?.fechas || {};
  const dayResults: DayAvailability[] = [];

  const todayStr = new Date().toISOString().split('T')[0];
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Caso 1: fechas es un Objeto (clave = fecha 'YYYY-MM-DD', valor = { horas: ... } | [])
  if (typeof rawFechas === 'object' && !Array.isArray(rawFechas)) {
    for (const [fechaStr, diaVal] of Object.entries(rawFechas)) {
      if (!diaVal || Array.isArray(diaVal)) continue; // Si es array vacío, no hay horas

      const horasObj = (diaVal as any).horas || {};
      const slots: CleanSlot[] = [];

      for (const [horaStr, horaData] of Object.entries(horasObj)) {
        const sillones = (horaData as any)?.sillones || {};
        const availableSillonEntry = Object.entries(sillones).find(
          ([_, isFree]) => isFree === true
        );

        if (availableSillonEntry) {
          const [sillonIdStr] = availableSillonEntry;
          const cleanHora = horaStr.slice(0, 5); // "14:30"
          const hourPart = parseInt(cleanHora.split(':')[0], 10);
          const minutePart = parseInt(cleanHora.split(':')[1] || '0', 10);

          // Descartar horas ya pasadas si la fecha es hoy
          if (fechaStr === todayStr) {
            const slotMinutes = hourPart * 60 + minutePart;
            if (slotMinutes <= currentMinutes + 15) {
              continue; // Menos de 15 min de margen
            }
          }

          slots.push({
            hora: cleanHora,
            hora_api: cleanHora.length === 5 ? `${cleanHora}:00` : cleanHora,
            id_sillon: parseInt(sillonIdStr, 10),
            id_sucursal: branchId,
            periodo: hourPart < 14 ? 'manana' : 'tarde',
          });
        }
      }

      // Ordenar cronológicamente
      slots.sort((a, b) => a.hora.localeCompare(b.hora));

      if (slots.length > 0) {
        dayResults.push({
          fecha: fechaStr,
          total_disponibles: slots.length,
          slots,
        });
      }
    }
  }

  // Caso 2: fechas es un Array `[{ fecha: '2026-10-20', horas: [...] }]`
  else if (Array.isArray(rawFechas)) {
    for (const dia of rawFechas) {
      const fechaStr = dia.fecha;
      const slots: CleanSlot[] = [];
      const horas = dia.horas || [];

      for (const bloque of horas) {
        const sillones = bloque.sillones || {};
        const availableSillonEntry = Object.entries(sillones).find(
          ([_, isFree]) => isFree === true
        );

        if (availableSillonEntry) {
          const [sillonIdStr] = availableSillonEntry;
          const cleanHora = (bloque.hora || '').slice(0, 5);
          const hourPart = parseInt(cleanHora.split(':')[0], 10);
          const minutePart = parseInt(cleanHora.split(':')[1] || '0', 10);

          if (fechaStr === todayStr) {
            const slotMinutes = hourPart * 60 + minutePart;
            if (slotMinutes <= currentMinutes + 15) {
              continue;
            }
          }

          slots.push({
            hora: cleanHora,
            hora_api: cleanHora.length === 5 ? `${cleanHora}:00` : cleanHora,
            id_sillon: parseInt(sillonIdStr, 10),
            id_sucursal: branchId,
            periodo: hourPart < 14 ? 'manana' : 'tarde',
          });
        }
      }

      slots.sort((a, b) => a.hora.localeCompare(b.hora));

      if (slots.length > 0) {
        dayResults.push({
          fecha: fechaStr,
          total_disponibles: slots.length,
          slots,
        });
      }
    }
  }

  // Ordenar días cronológicamente
  dayResults.sort((a, b) => a.fecha.localeCompare(b.fecha));
  return dayResults;
}

/**
 * Consulta la disponibilidad real de horas desde el endpoint nativo `/agendas`
 */
export async function getDisponibilidad(
  platform: HealthatomPlatform,
  id_sucursal: number,
  id_profesional: number,
  fecha_inicio: string,
  fecha_fin: string
): Promise<DayAvailability[]> {
  const { baseUrl, headers } = getAuthConfig(platform);

  const resource = platform === 'dentalink' ? 'dentistas' : 'profesionales';
  const queryParam = JSON.stringify({
    fecha_inicio: { eq: fecha_inicio },
    fecha_fin: { eq: fecha_fin },
  });

  const url = `${baseUrl}/sucursales/${id_sucursal}/${resource}/${id_profesional}/agendas?q=${encodeURIComponent(
    queryParam
  )}`;

  let res: Response = await fetch(url, {
    method: 'GET',
    headers,
    cache: 'no-store', // Disponibilidad en tiempo real
  });

  if (!res.ok && res.status === 404) {
    // Intentar con el recurso alternativo (v2 o dentistas/profesionales)
    const altResource = resource === 'dentistas' ? 'profesionales' : 'dentistas';
    const altUrl = `${baseUrl}/sucursales/${id_sucursal}/${altResource}/${id_profesional}/agendas?q=${encodeURIComponent(
      queryParam
    )}`;
    const altRes = await fetch(altUrl, { method: 'GET', headers, cache: 'no-store' });
    if (altRes.ok) {
      res = altRes;
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Healthatom] Error disponibilidad ${res.status}:`, errorText);
    return [];
  }

  const json: any = await res.json();
  return parseAvailableSlots(json.data || json, id_sucursal);
}

// -------------------------------------------------------------
// Pacientes (Búsqueda, Creación y Cross-Sync)
// -------------------------------------------------------------

/**
 * Busca un paciente por RUT en una plataforma específica
 */
export async function buscarPacientePorRut(
  platform: HealthatomPlatform,
  rut: string
): Promise<HealthatomPaciente | null> {
  const { baseUrl, headers } = getAuthConfig(platform);
  const formattedRut = formatRutForHealthatom(rut);

  const queryParam = JSON.stringify({
    rut: { eq: formattedRut },
  });

  const url = `${baseUrl}/pacientes?q=${encodeURIComponent(queryParam)}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    const list = Array.isArray(json.data) ? json.data : [];
    return list.length > 0 ? list[0] : null;
  } catch (err) {
    console.error(`[Healthatom] Error buscando paciente en ${platform}:`, err);
    return null;
  }
}

/**
 * Crea un nuevo paciente en una plataforma
 */
export async function crearPaciente(
  platform: HealthatomPlatform,
  pacienteData: {
    rut: string;
    nombre: string;
    apellidos: string;
    email: string;
    celular: string;
    telefono?: string;
    direccion?: string;
    ciudad?: string;
    fecha_nacimiento?: string;
    genero?: string;
    id_prevision?: number;
  }
): Promise<HealthatomPaciente | null> {
  const { baseUrl, headers } = getAuthConfig(platform);

  const payload = {
    ...pacienteData,
    rut: formatRutForHealthatom(pacienteData.rut),
  };

  try {
    const res = await fetch(`${baseUrl}/pacientes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Healthatom] Error creando paciente en ${platform} (${res.status}):`, errText);
      return null;
    }

    const json = await res.json();
    return json.data || json;
  } catch (err) {
    console.error(`[Healthatom] Fallo de red creando paciente en ${platform}:`, err);
    return null;
  }
}

/**
 * Actualiza los datos de contacto de un paciente existente
 */
export async function actualizarPaciente(
  platform: HealthatomPlatform,
  id_paciente: number,
  pacienteData: Partial<{
    nombre: string;
    apellidos: string;
    email: string;
    celular: string;
    telefono: string;
    direccion: string;
  }>
): Promise<boolean> {
  const { baseUrl, headers } = getAuthConfig(platform);

  try {
    const res = await fetch(`${baseUrl}/pacientes/${id_paciente}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(pacienteData),
    });
    return res.ok;
  } catch (err) {
    console.error(`[Healthatom] Error actualizando paciente ${id_paciente}:`, err);
    return false;
  }
}

/**
 * Algoritmo de Sincronización Cruzada (Cross-Platform Patient Sync)
 * Si el paciente no existe en la plataforma solicitada, busca en la plataforma hermana
 * y lo crea automáticamente.
 */
export async function buscarOSincronizarPaciente(
  targetPlatform: HealthatomPlatform,
  rut: string
): Promise<{ paciente: HealthatomPaciente | null; crossSynced: boolean }> {
  // 1. Buscar en la plataforma destino
  const existing = await buscarPacientePorRut(targetPlatform, rut);
  if (existing) {
    return { paciente: existing, crossSynced: false };
  }

  // 2. Si no existe, buscar en la otra plataforma
  const otherPlatform: HealthatomPlatform =
    targetPlatform === 'dentalink' ? 'medilink' : 'dentalink';

  const otherPatient = await buscarPacientePorRut(otherPlatform, rut);
  if (!otherPatient) {
    return { paciente: null, crossSynced: false };
  }

  // 3. Existe en la plataforma hermana: replicar en la plataforma destino
  const cloned = await crearPaciente(targetPlatform, {
    rut: otherPatient.rut,
    nombre: otherPatient.nombre,
    apellidos: otherPatient.apellidos,
    email: otherPatient.email || '',
    celular: otherPatient.celular || otherPatient.telefono || '',
    telefono: otherPatient.telefono,
    direccion: otherPatient.direccion,
    ciudad: otherPatient.ciudad,
    fecha_nacimiento: otherPatient.fecha_nacimiento,
    genero: otherPatient.genero,
    id_prevision: otherPatient.id_prevision,
  });

  return {
    paciente: cloned || otherPatient,
    crossSynced: true,
  };
}

// -------------------------------------------------------------
// Reserva Final de Cita (/citas)
// -------------------------------------------------------------

export async function agendarCita(
  platform: HealthatomPlatform,
  cita: {
    id_paciente: number;
    id_profesional: number;
    id_sucursal: number;
    id_sillon: number;
    fecha: string;        // "YYYY-MM-DD"
    hora_inicio: string;  // "10:00:00"
    duracion?: number;    // default 30
    comentarios?: string;
  }
): Promise<{ success: boolean; id_cita?: number; error?: string }> {
  const { baseUrl, headers } = getAuthConfig(platform);

  // Healthatom API (Dentalink y Medilink) requiere hora_inicio en formato H:i ("18:15")
  const cleanHoraInicio = cita.hora_inicio.slice(0, 5);

  const stateAgendado =
    parseInt(process.env.HEALTHATOM_STATE_AGENDADO_API || '29', 10) || 29;

  // Payload requerido por Healthatom API (Dentalink requiere id_dentista, Medilink requiere id_profesional)
  const payload: any = {
    id_paciente: cita.id_paciente,
    id_dentista: cita.id_profesional,
    id_profesional: cita.id_profesional,
    id_sucursal: cita.id_sucursal,
    id_sillon: cita.id_sillon,
    id_estado: stateAgendado,
    fecha: cita.fecha,
    hora_inicio: cleanHoraInicio,
    duracion: cita.duracion || 30,
    comentarios: cita.comentarios || 'Agendado vía Web Policlínico Tabancura',
  };

  try {
    let res: Response = await fetch(`${baseUrl}/citas`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`[Healthatom] Error creando cita (${res.status}):`, errText);

      // Si falló por formato de hora inicio, reintentar con el formato alternativo (:00)
      if (errText.includes('format H:i') || errText.includes('hora_inicio') || errText.includes('hora inicio')) {
        const altHora = cleanHoraInicio.length === 5 ? `${cleanHoraInicio}:00` : cleanHoraInicio.slice(0, 5);
        const retryRes: Response = await fetch(`${baseUrl}/citas`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ ...payload, hora_inicio: altHora }),
        });
        if (retryRes.ok) {
          res = retryRes;
        }
      }

      if (!res.ok) {
        let errorMsg = 'No fue posible confirmar la hora. Es posible que el horario ya no se encuentre disponible.';
        try {
          const parsed = JSON.parse(errText);
          if (parsed.error?.message) errorMsg = parsed.error.message;
          else if (parsed.message) errorMsg = parsed.message;
        } catch {}
        return {
          success: false,
          error: errorMsg,
        };
      }
    }

    const json: any = await res.json();
    const idCita = json.data?.id || json.id;

    // Disparar Webhook opcional de n8n en segundo plano si está configurado
    if (process.env.N8N_WEBHOOK_CITA_CREADA) {
      fetch(process.env.N8N_WEBHOOK_CITA_CREADA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          id_cita: idCita,
          ...payload,
        }),
      }).catch((webhookErr) =>
        console.error('[Healthatom] Error llamando webhook n8n:', webhookErr)
      );
    }

    return {
      success: true,
      id_cita: idCita,
    };
  } catch (err: any) {
    console.error('[Healthatom] Fallo de conexión creando cita:', err);
    return {
      success: false,
      error: 'Error de red al conectar con el servidor médico.',
    };
  }
}
