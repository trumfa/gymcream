/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				display: ["Syncopate", ...defaultTheme.fontFamily.sans],
				serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
			},
			colors: {
				gcDark: "#080808",
				gcYellow: "#ffe600",
				gcPink: "#ff2eb8",
				gcClassic: "#f9f6f0",
				primary: {
					50: "#fef1f7",
					100: "#fee5f0",
					200: "#fecce3",
					300: "#ffa2cb",
					400: "#fe68a7",
					500: "#f83c86",
					600: "#e91f64",
					700: "#ca0c47",
					800: "#a70d3b",
					900: "#8b1034",
					950: "#55021a",
				},
			},
		},
	},
	plugins: [require.resolve("prettier-plugin-astro")],
	darkMode: "class",
};
