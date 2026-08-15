/**
 * Calendar Synchronization Utilities for Fabi Studio Academy
 * Supports Google Calendar, Outlook Web, and Apple/Standard .ICS downloads
 */

export interface CalendarEventData {
  title: string;
  description: string;
  location?: string;
  startDate: Date;
  endDate: Date;
}

function formatDateToICS(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d+/g, '');
}

/**
 * Generates a direct Google Calendar creation link
 */
export function getGoogleCalendarUrl(event: CalendarEventData): string {
  const start = formatDateToICS(event.startDate);
  const end = formatDateToICS(event.endDate);
  const details = encodeURIComponent(event.description);
  const text = encodeURIComponent(event.title);
  const location = encodeURIComponent(event.location || 'Campus Virtual FABY STUDIO ACADEMY (Online)');

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

/**
 * Generates an Outlook Web calendar creation link
 */
export function getOutlookCalendarUrl(event: CalendarEventData): string {
  const start = event.startDate.toISOString();
  const end = event.endDate.toISOString();
  const subject = encodeURIComponent(event.title);
  const body = encodeURIComponent(event.description);
  const location = encodeURIComponent(event.location || 'Campus Virtual FABY STUDIO ACADEMY');

  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${subject}&body=${body}&startdt=${start}&enddt=${end}&location=${location}`;
}

/**
 * Generates and triggers download of a standardized .ics file
 */
export function downloadICSFile(event: CalendarEventData, filename?: string): void {
  const start = formatDateToICS(event.startDate);
  const end = formatDateToICS(event.endDate);
  const now = formatDateToICS(new Date());
  const uid = `${Date.now()}-fabystudio@academy`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FABY STUDIO ACADEMY//LMS Calendar 2.0//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location || 'Campus Virtual FABY STUDIO ACADEMY'}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Recordatorio: Sesión académica en 30 minutos',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${filename || 'evento-fabi-studio'}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
