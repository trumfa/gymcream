// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

// Website metadata
export const SITE_URL: string = "https://gymcream.me";
export const SITE_TITLE: string = "Gym Cream";
export const SITE_DESCRIPTION: string = "Trenca les regles - Marca independent d'equipament i apparel de gimnàs.";

// SEO metadata
export const TWITTER_CREATOR: string = "@xxx";

// Navigation
type Page = {
	title: string;
	href: string;
	children?: Page[];
};

export const PAGES: Page[] = [
	{
		title: "home",
		href: "/",
	},
	{
		title: "blog",
		href: "/blog",
	},
	{
		title: "about",
		href: "/about",
	},
];

// i18n
export const DEFAULT_LOCALE = "en";
export const LOCALES = {
	en: "en", // the `defaultLocale` value must present in `locales` keys
	it: "it",
};
