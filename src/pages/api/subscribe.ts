import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, type, productId, productName, website, honeypot } = await request.json();

    // Honeypot anti-spam
    if (website || honeypot) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    const cleanEmail = String(email || '').trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@') || !type || !['restock', 'newsletter'].includes(type)) {
      return new Response(JSON.stringify({ error: 'Dades no vàlides' }), { status: 400 });
    }

    try {
      await writeRow('Subscriptions', 'create', {
        email: cleanEmail,
        type,
        productId: String(productId || '').trim(),
        productName: String(productName || '').replace(/<[^>]*>?/gm, '').trim(),
        notified: false,
      });
    } catch (err) {
      console.warn("Avís: No s'ha pogut guardar la subscripció al CMS Sheet:", err);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Error a /api/subscribe:', err);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500 });
  }
};
