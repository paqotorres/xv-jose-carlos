// Todos los datos de la invitación viven aquí para editarlos en un solo lugar.

export const EVENT = {
  celebrant: 'José Carlos',
  title: 'XV años de José Carlos',
  // Hora del centro de México / Torreón (UTC-6, sin horario de verano).
  start: '2026-10-09T20:00:00-06:00',
  end: '2026-10-10T02:00:00-06:00',
  dateLabel: 'Viernes 9 de Octubre 2026',
  timeLabel: '20:00 hrs',
  venue: 'Quinta Jeyma',
  address: ['Otoño 415 Miguel de la Madrid', 'Gómez Palacio, Dgo.'],
  music: {
    src: '/el-toro-viejo.mp3',
    title: 'El Toro Viejo',
    artist: 'Julión Álvarez y su Norteño Banda',
  },
  mapsUrl: 'https://maps.app.goo.gl/TUXfkAgE2dJSwcby9',
  whatsappUrl:
    'https://api.whatsapp.com/send/?phone=5218711228761&text=Confirmo%20asistencia%20a%20los%20XV%20de%20Jose%20Carlos',
  transfer: {
    number: '4152 3146 8901 7708',
    holder: 'José Carlos Muñoz López',
  },
};

const toUtcStamp = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

const details = `¡Te espero para celebrar mis XV años! Dress code: Vaquero. Ubicación: ${EVENT.mapsUrl}`;

export const calendarLinks = {
  google:
    'https://calendar.google.com/calendar/render?' +
    new URLSearchParams({
      action: 'TEMPLATE',
      text: EVENT.title,
      dates: `${toUtcStamp(EVENT.start)}/${toUtcStamp(EVENT.end)}`,
      details,
      location: `${EVENT.venue}, ${EVENT.address.join(', ')}`,
    }).toString(),
  outlook:
    'https://outlook.live.com/calendar/0/deeplink/compose?' +
    new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: EVENT.title,
      startdt: new Date(EVENT.start).toISOString(),
      enddt: new Date(EVENT.end).toISOString(),
      body: details,
      location: `${EVENT.venue}, ${EVENT.address.join(', ')}`,
    }).toString(),
};

export function buildIcs() {
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//XV Jose Carlos//Invitacion//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:xv-jose-carlos-20261009@invitacion',
    `DTSTAMP:${toUtcStamp(new Date().toISOString())}`,
    `DTSTART:${toUtcStamp(EVENT.start)}`,
    `DTEND:${toUtcStamp(EVENT.end)}`,
    `SUMMARY:${EVENT.title}`,
    `LOCATION:${[EVENT.venue, ...EVENT.address].join(', ').replace(/,/g, '\\,')}`,
    `DESCRIPTION:${details.replace(/,/g, '\\,')}`,
    `URL:${EVENT.mapsUrl}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Mañana son los XV de José Carlos',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}
