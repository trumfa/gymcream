const CMS_API_URL = import.meta.env.CMS_API_URL;
const CMS_API_TOKEN = import.meta.env.CMS_API_TOKEN;

// Marge de temps abans de donar per perdut Apps Script. Es queda per
// sota del maxDuration de la funció de Vercel (30s) perquè el nostre
// propi codi falli de forma controlada (i puguem tornar un 404 net)
// ABANS que Vercel mati la funció sencera sense cap explicació.
const CMS_TIMEOUT_MS = 20000;

function assertConfigured() {
  if (!CMS_API_URL) {
    throw new Error('Falta configurar CMS_API_URL como variable de entorno.');
  }
}

async function fetchWithTimeout(url: string, options?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CMS_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      throw new Error(`El CMS (Apps Script) ha tardat més de ${CMS_TIMEOUT_MS / 1000}s en respondre.`);
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function getSheet<T = any>(sheetName: string, lang?: string): Promise<T[]> {
  assertConfigured();
  const params = new URLSearchParams({ sheet: sheetName });
  if (lang) params.set('lang', lang);
  const res = await fetchWithTimeout(`${CMS_API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Error leyendo ${sheetName}: ${res.status}`);
  return res.json();
}

export async function getAllSheets(lang?: string): Promise<Record<string, any[]>> {
  assertConfigured();
  const params = new URLSearchParams({ sheet: 'all' });
  if (lang) params.set('lang', lang);
  const res = await fetchWithTimeout(`${CMS_API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Error leyendo el CMS: ${res.status}`);
  return res.json();
}

export async function writeRow(
  sheet: string,
  action: 'create' | 'update' | 'delete',
  row: Record<string, any>
) {
  assertConfigured();
  if (!CMS_API_TOKEN) {
    throw new Error('Falta configurar CMS_API_TOKEN como variable de entorno.');
  }
  const res = await fetchWithTimeout(CMS_API_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sheet, action, row, token: CMS_API_TOKEN }),
  });
  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.error || 'Error escribiendo en el CMS');
  }
  return data.data;
}
