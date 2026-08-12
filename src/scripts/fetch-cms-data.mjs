// scripts/fetch-cms-data.mjs
//
// Es demana TOT el contingut del Sheet (cada pestanya, en els 3
// idiomes) UNA SOLA VEGADA, de forma controlada i seqüencial, ABANS
// que Astro comenci a generar cap pàgina. El resultat es guarda en
// un fitxer local (.cms-cache/data.json) que totes les pàgines
// llegeixen directament del disc — cap petició de xarxa durant la
// generació de pàgines en si.
//
// Per què: Astro pot generar diverses pàgines EN PARAL·LEL durant el
// build. Si cada pàgina demana les seves dades a Apps Script pel seu
// compte, es poden disparar moltes peticions simultànies — Apps
// Script té límits d'execucions concurrents, i les que "perden la
// cursa" poden tornar buides o fallar. Fent-ho tot d'un sol cop, de
// manera seqüencial i amb reintents, s'evita aquest problema del tot.
//
// S'executa com a pas previ al build (veure "build" a package.json).

import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, "..", ".cms-cache");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "data.json");

const CMS_API_URL = process.env.CMS_API_URL;
const SHEETS = ["Products", "Categories", "Slides", "Phrases", "InfoPages", "CommunityQuotes", "CommunityPhotos"];
const LOCALES = ["ca", "es", "en"];

const TIMEOUT_MS = 45000;
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000;

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithTimeout(url) {
	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
	try {
		const res = await fetch(url, { signal: controller.signal });
		return res;
	} finally {
		clearTimeout(timeoutId);
	}
}

async function fetchSheetWithRetry(sheet, lang) {
	const url = `${CMS_API_URL}?sheet=${encodeURIComponent(sheet)}&lang=${encodeURIComponent(lang)}`;
	let lastError;
	for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
		try {
			const res = await fetchWithTimeout(url);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data = await res.json();
			if (!Array.isArray(data)) throw new Error("Resposta no és un array");
			return data;
		} catch (err) {
			lastError = err;
			console.warn(`  ⚠️  ${sheet} (${lang}) intent ${attempt}/${MAX_RETRIES} fallit: ${err.message}`);
			if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
		}
	}
	console.error(`  ❌ ${sheet} (${lang}) ha fallat després de ${MAX_RETRIES} intents. Es fa servir un array buit.`);
	return [];
}

async function main() {
	if (!CMS_API_URL) {
		console.error("❌ Falta la variable d'entorn CMS_API_URL. No es pot precarregar el CMS.");
		process.exit(1);
	}

	console.log("📦 Precarregant TOT el contingut del Sheet (una sola vegada, de forma seqüencial)...\n");

	const data = {};
	const startTime = Date.now();

	// Seqüencial (no Promise.all de tot) a propòsit — així mai hi ha
	// més d'una petició activa alhora contra Apps Script.
	for (const sheet of SHEETS) {
		data[sheet] = {};
		for (const lang of LOCALES) {
			process.stdout.write(`  → ${sheet} (${lang})... `);
			const result = await fetchSheetWithRetry(sheet, lang);
			data[sheet][lang] = result;
			console.log(`✓ ${result.length} files`);
		}
	}

	mkdirSync(OUTPUT_DIR, { recursive: true });
	writeFileSync(OUTPUT_FILE, JSON.stringify(data), "utf-8");

	const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
	console.log(`\n✅ Precàrrega completada en ${elapsed}s. Guardat a ${OUTPUT_FILE}`);
}

main().catch((err) => {
	console.error("❌ Error inesperat precarregant el CMS:", err);
	process.exit(1);
});
