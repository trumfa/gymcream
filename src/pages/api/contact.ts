export const prerender = false;

import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, message } = await request.json();

    if (!email || !email.includes('@') || !message || !message.trim()) {
      return new Response(JSON.stringify({ error: 'Dades no vàlides' }), { status: 400 });
    }

    await writeRow('ContactMessages', 'create', {
      email,
      message: message.trim(),
      read: false,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error del servidor' }), {
      status: 500,
    });
  }
};
