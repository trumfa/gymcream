const CMS_API_URL = import.meta.env.CMS_API_URL;
const CMS_API_TOKEN = import.meta.env.CMS_API_TOKEN;

function assertConfigured() {
  if (!CMS_API_URL) {
    throw new Error('Falta configurar CMS_API_URL como variable de entorno.');
  }
}

export async function getSheet<T = any>(sheetName: string, lang?: string): Promise<T[]> {
  assertConfigured();
  const params = new URLSearchParams({ sheet: sheetName });
  if (lang) params.set('lang', lang);
  const res = await fetch(`${CMS_API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Error leyendo ${sheetName}: ${res.status}`);
  return res.json();
}

export async function getAllSheets(lang?: string): Promise<Record<string, any[]>> {
  assertConfigured();
  const params = new URLSearchParams({ sheet: 'all' });
  if (lang) params.set('lang', lang);
  const res = await fetch(`${CMS_API_URL}?${params.toString()}`);
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
  const res = await fetch(CMS_API_URL!, {
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
