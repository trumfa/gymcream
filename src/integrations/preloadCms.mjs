// src/integrations/preloadCms.mjs
//
// Integració d'Astro que precarrega TOT el contingut del Sheet (cada
// pestanya, en els 3 idiomes) UNA SOLA VEGADA, de forma seqüencial,
// EN EL MOMENT EXACTE en què comença el build ("astro:build:start").
//
// Per què com a integració i no com a script extern encadenat amb
// "&&": un script extern depèn que el gestor de paquets (Bun, en
// aquest cas) respecti la cadena de comandos correctament — si per
// qualsevol motiu no ho fa, el pas de precàrrega es pot saltar en
// silenci i el build cau de nou en peticions directes i concurrents
// a Apps Script. Fent-ho com a integració, queda garantit que
// s'executa SEMPRE com a part del mateix procés d'Astro, abans que
// es generi cap pàgina.

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

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
		return await fetch(url, { signal: controller.signal });
	} finally {
		clearTimeout(timeoutId);
	}
}

async function fetchSheetWithRetry(cmsApiUrl, sheet, lang, log) {
	const url = `${cmsApiUrl}?sheet=${encodeURIComponent(sheet)}&lang=${encodeURIComponent(lang)}`;
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
			log.warn(`  ⚠️  ${sheet} (${lang}) intent ${attempt}/${MAX_RETRIES} fallit: ${err.message}`);
			if (attempt < MAX_RETRIES) await sleep(RETRY_DELAY_MS * attempt);
		}
	}
	log.error(`  ❌ ${sheet} (${lang}) ha fallat després de ${MAX_RETRIES} intents. Es fa servir un array buit.`);
	return [];
}

export default function preloadCms() {
	return {
		name: "preload-cms",
		hooks: {
			"astro:build:start": async ({ logger }) => {
				const cmsApiUrl = process.env.CMS_API_URL;
				if (!cmsApiUrl) {
					logger.warn("⚠️  CMS_API_URL no configurada — es continua sense precarregar (cada pàgina farà la seva pròpia crida directa).");
					return;
				}

				logger.info("📦 Precarregant TOT el contingut del Sheet (una sola vegada, de forma seqüencial)...");
				const startTime = Date.now();
				const data = {};

				for (const sheet of SHEETS) {
					data[sheet] = {};
					for (const lang of LOCALES) {
						const result = await fetchSheetWithRetry(cmsApiUrl, sheet, lang, logger);
						data[sheet][lang] = result;
						logger.info(`  → ${sheet} (${lang}): ${result.length} files`);
					}
				}

				const outputDir = path.join(process.cwd(), ".cms-cache");
				mkdirSync(outputDir, { recursive: true });
				writeFileSync(path.join(outputDir, "data.json"), JSON.stringify(data), "utf-8");

				const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
				logger.info(`✅ Precàrrega completada en ${elapsed}s.`);
			},
		},
	};
}
