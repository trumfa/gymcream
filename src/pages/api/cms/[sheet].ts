export const prerender = false;

import type { APIRoute } from 'astro';
import { getSheet } from '../../../lib/cms';

// Solo lectura: el contenido ahora se edita directamente en el Google Sheet,
// no hay ningún panel en la web que escriba aquí. Las únicas escrituras
// públicas siguen siendo /api/notify-quote y /api/subscribe, que solo crean
// filas concretas con status forzado server-side.
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const lang = url.searchParams.get('lang') || undefined;
    const data = await getSheet(params.sheet!, lang);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
