import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import alpinejs from "@astrojs/alpinejs";
import node from "@astrojs/node";
import vercel from "@astrojs/vercel/serverless";
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration";
import { DEFAULT_LOCALE, LOCALES, SITE_URL } from "./src/consts";

const defaultLocale = DEFAULT_LOCALE;
const locales = LOCALES;

const isVercel = process.env.VERCEL === "1" || process.env.VERCEL === "true" || !!process.env.VERCEL_ENV;

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/open-brand': '/gymcreamer',
  },
	site: SITE_URL,
	output: "hybrid",
	adapter: isVercel ? vercel() : node({ mode: "standalone" }),
	trailingSlash: "ignore",
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
