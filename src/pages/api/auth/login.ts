export const prerender = false;

import type { APIRoute } from 'astro';
import { verifyPassword, createSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { password } = await request.json();
    if (!password || !verifyPassword(password)) {
      return new Response(JSON.stringify({ error: 'Contraseña incorrecta' }), { status: 401 });
    }
    createSessionCookie(cookies);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
