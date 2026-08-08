export const prerender = false;

import type { APIRoute } from 'astro';
import { requireAdminSession } from '../../../lib/auth';

export const GET: APIRoute = async ({ cookies }) => {
  const authenticated = requireAdminSession(cookies);
  return new Response(JSON.stringify({ authenticated }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
