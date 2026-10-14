/**
 * Generador de enlaces a Google Calendar y archivos .ics para confirmación de citas
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  startDate: string; // "YYYY-MM-DD"
  startTime: string; // "HH:mm" o "HH:mm:ss"
  durationMinutes: number;
}

function parseDateTime(dateStr: string, timeStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);
  const [hours, minutes] = timeStr.split(':').map(Number);
  // Hora local de Santiago (America/Santiago)
  return new Date(year, month - 1, day, hours, minutes, 0);
}

function formatDateToICS(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(
    d.getHours()
  )}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

export function generateGoogleCalendarUrl(event: CalendarEventDetails): string {
  const start = parseDateTime(event.startDate, event.startTime);
  const end = new Date(start.getTime() + event.durationMinutes * 60 * 1000);

  const startUtc = start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endUtc = end.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${startUtc}/${endUtc}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateICSContent(event: CalendarEventDetails): string {
  const start = parseDateTime(event.startDate, event.startTime);
  const end = new Date(start.getTime() + event.durationMinutes * 60 * 1000);

  const dtStart = formatDateToICS(start);
  const dtEnd = formatDateToICS(end);
  const now = formatDateToICS(new Date());
  const uid = `pt-cita-${Date.now()}@policlinicotabancura.cl`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Policlínico Tabancura//Sistema de Agendamiento//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
