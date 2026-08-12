import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, message, website, honeypot } = await request.json();

    // Honeypot anti-spam
    if (website || honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanMessage = String(message || '').replace(/<[^>]*>?/gm, '').trim();

    if (!cleanEmail || !cleanEmail.includes('@') || !cleanMessage) {
      return new Response(JSON.stringify({ error: 'Dades no vàlides' }), { status: 400 });
    }

    try {
      await writeRow('ContactMessages', 'create', {
        email: cleanEmail,
        message: cleanMessage,
        read: false,
      });
    } catch (err) {
      console.warn("Avís: No s'ha pogut guardar el missatge al CMS Sheet:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error a /api/contact:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500 });
  }
};
