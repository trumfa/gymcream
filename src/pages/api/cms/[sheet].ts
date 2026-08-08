export const prerender = false;

import type { APIRoute } from 'astro';
import { getSheet, writeRow } from '../../../lib/cms';
import { requireAdminSession } from '../../../lib/auth';

export const GET: APIRoute = async ({ params }) => {
  try {
    const data = await getSheet(params.sheet!);
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ params, request, cookies }) => {
  // Toda escritura por esta ruta requiere sesión de admin válida (cookie
  // httpOnly, ver src/lib/auth.ts). Las escrituras públicas (propuesta de
  // frase, suscripción de stock) usan sus propios endpoints dedicados
  // (/api/notify-quote, /api/subscribe), que solo pueden crear filas
  // concretas y con status forzado server-side.
  if (!requireAdminSession(cookies)) {
    return new Response(JSON.stringify({ error: 'No autoritzat' }), { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await writeRow(params.sheet!, body.action, body.row);
    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
};
