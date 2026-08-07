export const prerender = false;

import type { APIRoute } from 'astro';
import { loadCmsStore, saveCmsStore } from '../../utils/cmsStore';

export const GET: APIRoute = async () => {
  const data = loadCmsStore();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    let update: Record<string, any> = {};

    if (body.key && body.value !== undefined) {
      update[body.key] = body.value;
    } else if (typeof body === 'object' && body !== null) {
      update = body;
    }

    const saved = saveCmsStore(update);

    return new Response(JSON.stringify({ success: true, cms: saved }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e.message || 'Error desant dades CMS' }), {
      status: 200, // Return 200 with success: false to avoid client throwing unhandled errors
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
