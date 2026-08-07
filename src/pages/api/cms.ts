export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

// Fitxer on es persisteixen les dades del CMS al servidor
const STORE_PATH = path.resolve(process.cwd(), 'cms_store.json');

// Carregar dades inicials o existent
function loadStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error llegint cms_store.json:', e);
  }
  return {};
}

function saveStore(data: any) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error escrivint cms_store.json:', e);
  }
}

// Memory cache
let inMemoryCms = loadStore();

export const GET: APIRoute = async () => {
  // Re-check disk in case updated
  const diskData = loadStore();
  inMemoryCms = { ...inMemoryCms, ...diskData };

  return new Response(JSON.stringify(inMemoryCms), {
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
    
    if (body.key && body.value !== undefined) {
      inMemoryCms[body.key] = body.value;
    } else if (typeof body === 'object') {
      inMemoryCms = { ...inMemoryCms, ...body };
    }

    saveStore(inMemoryCms);

    return new Response(JSON.stringify({ success: true, cms: inMemoryCms }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || 'Error guardant dades CMS' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
