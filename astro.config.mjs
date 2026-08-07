import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import vercel from "@astrojs/vercel";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/consts";

const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	output: "hybrid",
	adapter: vercel(),
	trailingSlash: "always",
	build: {
		format: "directory",
	},
	server: {
		host: "0.0.0.0",
		port: 3000,
	},
	vite: {
		logLevel: "error",
		define: {
			__DATE__: `'${new Date()}'`,
		},
	},
	integrations: [
		mdx(),
		tailwind({
			applyBaseStyles: false,
		}),
		alpinejs(),
		i18n({
			locales,
			defaultLocale,
			exclude: ["pages/api/**/*", "src/pages/api/**/*", "api/**/*", "pages/rss.xml.ts", "pages/[locale]/rss.xml.ts"],
		}),
	],
});
