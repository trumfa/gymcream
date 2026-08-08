export const prerender = false;

import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email, type, productId, productName } = await request.json();

    if (!email || !email.includes('@') || !type || !['restock', 'newsletter'].includes(type)) {
      return new Response(JSON.stringify({ error: 'Dades no vàlides' }), { status: 400 });
    }

    await writeRow('Subscriptions', 'create', {
      email,
      type,
      productId: productId || '',
      productName: productName || '',
      notified: false,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error del servidor' }), {
      status: 500,
    });
  }
};
