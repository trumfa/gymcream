/**
 * From https://github.com/trktml/lotusforafrica/blob/main/src/utils/translationTools.ts
 */

import { DEFAULT_LOCALE, LOCALES } from "@src/consts";
import { getLocale } from "astro-i18n-aut";

import ca from "@locales/ca.json";
import es from "@locales/es.json";
import en from "@locales/en.json";

const handler = {
	get(target: any, prop: any, receiver: any) {
		return target[prop].replaceAll("\n", "<br/>");
	},
};

const ca_proxy = new Proxy(ca, handler);
const es_proxy = new Proxy(es, handler);
const en_proxy = new Proxy(en, handler);

export const defaultLocale = DEFAULT_LOCALE;
export const locales = LOCALES;

/**
 * Return the locale object with all the translations for a specific locale
 * @param astroUrl
 * @returns
 */
export default function t(astroUrl: URL): Locales {
	const locale = getLocale(astroUrl);

	switch (locale) {
		case "es":
			return es_proxy as Locales;
		case "en":
			return en_proxy as Locales;
		default:
			return ca_proxy as Locales;
	}
}

export function tFn(astroUrl: URL) {
	const locale = getLocale(astroUrl);
	let translations: any;

	switch (locale) {
		case "es":
			translations = es_proxy;
			break;
		case "en":
			translations = en_proxy;
			break;
		default:
			translations = ca_proxy;
			break;
	}

	return (key: string): string => {
		if (key in translations) {
			return translations[key];
		}
		console.warn(`Missing translation key: ${key}`);
		return key;
	};
}

/**
 *
 * @param link Localize a specific path
 * @param astroUrl
 * @returns
 */
export function localizePath(
	link: string | URL,
	astroUrl: string | URL,
): string {
	const locale = getLocale(astroUrl);
	let localizedLink = "";
	if (locale && locale !== defaultLocale) {
		const localeLink =
			`/${getLocale(astroUrl) ?? ""}/${link}`.replaceAll("//", "/") ?? "";
		localizedLink = localeLink;
	} else {
		localizedLink = String(link);
	}

	// localizedLink add last slash
	if (!localizedLink.endsWith("/")) {
		localizedLink += "/";
	}

	return localizedLink;
}
