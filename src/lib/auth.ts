import type { AstroCookies } from 'astro';
import crypto from 'node:crypto';

const ADMIN_PASSWORD_HASH = import.meta.env.ADMIN_PASSWORD_HASH;
const SESSION_SECRET = import.meta.env.SESSION_SECRET;
const COOKIE_NAME = 'gc_admin_session';

function assertConfigured() {
  if (!ADMIN_PASSWORD_HASH || !SESSION_SECRET) {
    throw new Error(
      'Falta configurar ADMIN_PASSWORD_HASH y/o SESSION_SECRET como variables de entorno.'
    );
  }
}

function sessionToken(): string {
  return crypto.createHmac('sha256', SESSION_SECRET!).update('admin-session').digest('hex');
}

export function verifyPassword(input: string): boolean {
  assertConfigured();
  const inputHash = crypto.createHash('sha256').update(input).digest('hex');
  return inputHash === ADMIN_PASSWORD_HASH;
}

export function createSessionCookie(cookies: AstroCookies) {
  assertConfigured();
  cookies.set(COOKIE_NAME, sessionToken(), {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 horas
  });
}

export function clearSessionCookie(cookies: AstroCookies) {
  cookies.delete(COOKIE_NAME, { path: '/' });
}

export function requireAdminSession(cookies: AstroCookies): boolean {
  assertConfigured();
  const token = cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return token === sessionToken();
}
