import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const CMS_API_URL = import.meta.env.CMS_API_URL;
const CMS_API_TOKEN = import.meta.env.CMS_API_TOKEN;

// Si "npm run build" ha executat abans el script de precàrrega
// (scripts/fetch-cms-data.mjs), aquí hi ha TOT el contingut del Sheet
// ja demanat una sola vegada de forma controlada — es llegeix
// directament del disc, sense cap petició de xarxa ni possibilitat
// de fallar per lentitud o concurrència d'Apps Script.
let preloadedData: Record<string, Record<string, any[]>> | null = null;
try {
	const __dirname = path.dirname(fileURLToPath(import.meta.url));
	// cms.ts viu a src/lib/ — el fitxer precarregat és a l'arrel del projecte
	const candidatePaths = [
		path.join(__dirname, "..", "..", ".cms-cache", "data.json"),
		path.join(process.cwd(), ".cms-cache", "data.json"),
	];
	for (const p of candidatePaths) {
		try {
			preloadedData = JSON.parse(readFileSync(p, "utf-8"));
			break;
		} catch {
			// prova la següent ruta
		}
	}
} catch {
	// No hi ha fitxer precarregat (ex: desenvolupament local sense
	// haver executat el script) — es farà servir la crida directa de
	// sempre, més avall.
}

// Ara TOTA la crida al CMS passa durant el BUILD (cap visitant espera
// mai res en directe) — no hi ha cap pressa real, així que val la
// pena donar-li un marge generós abans de rendir-nos.
const CMS_TIMEOUT_MS = 45000;

// Si Apps Script falla o tarda massa, ho reintentem unes quantes
// vegades abans de donar-ho per perdut del tot — un sol moment lent
// (arrencada en fred, per exemple) no hauria de tombar tot el build.
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

// Memòria cau EN MEMÒRIA del propi mòdul (sense cap crida de xarxa
// addicional, a diferència d'intentar trucar al nostre propi domini
// per HTTP, que pot fallar de forma imprevisible dins d'una funció
// serverless de Vercel). Es manté mentre la funció serverless estigui
// "calenta" (típicament uns minuts entre peticions) — no cal que
// funcioni sempre, és només per estalviar-nos crides repetides quan
// hi ha trànsit seguit.
const memoryCache = new Map<string, { data: any; expiresAt: number }>();
const MEMORY_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minuts

function getFromMemoryCache_(key: string): any | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.data;
}

function setMemoryCache_(key: string, data: any) {
  memoryCache.set(key, { data, expiresAt: Date.now() + MEMORY_CACHE_TTL_MS });
}

function assertConfigured() {
  if (!CMS_API_URL) {
    throw new Error('Falta configurar CMS_API_URL como variable de entorno.');
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

// Igual que fetchWithTimeout, però reintenta fins a MAX_RETRIES cops
// (amb una petita espera entre intents) abans de donar l'error per
// definitiu — pensat per a les crides del BUILD, on un fallada
// puntual no s'ha de traduir en un deploy sencer trencat.
async function fetchWithRetry(url: string, options?: RequestInit): Promise<Response> {
  let lastError: any;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await fetchWithTimeout(url, options);
    } catch (err) {
      lastError = err;
      console.warn(`[cms] Intent ${attempt}/${MAX_RETRIES} fallit per ${url}: ${(err as Error).message}`);
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt); // espera creixent: 3s, 6s, 9s...
      }
    }
  }
  throw lastError;
}

export async function getSheet<T = any>(sheetName: string, lang?: string): Promise<T[]> {
  const effectiveLang = lang || 'ca';

  // 1. Dades precarregades (sense xarxa) — el cas normal en producció.
  if (preloadedData && preloadedData[sheetName] && preloadedData[sheetName][effectiveLang] !== undefined) {
    return preloadedData[sheetName][effectiveLang] as T[];
  }

  // 2. Si no hi ha precàrrega (ex: desenvolupament local), es fa la
  // crida directa de sempre, amb memòria cau i reintents.
  assertConfigured();
  const cacheKey = `sheet_${sheetName}_${effectiveLang}`;
  const cached = getFromMemoryCache_(cacheKey);
  if (cached !== null) return cached;

  const params = new URLSearchParams({ sheet: sheetName });
  if (lang) params.set('lang', lang);
  const res = await fetchWithRetry(`${CMS_API_URL}?${params.toString()}`);
  if (!res.ok) throw new Error(`Error leyendo ${sheetName}: ${res.status}`);
  const data = await res.json();
  setMemoryCache_(cacheKey, data);
  return data;
}

export async function getAllSheets(lang?: string): Promise<Record<string, any[]>> {
  assertConfigured();
  const params = new URLSearchParams({ sheet: 'all' });
  if (lang) params.set('lang', lang);
  const res = await fetchWithRetry(`${CMS_API_URL}?${params.toString()}`);
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
