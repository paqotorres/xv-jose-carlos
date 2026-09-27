import { buildIcs } from '../data/event';

export const GET = () =>
  new Response(buildIcs(), {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
