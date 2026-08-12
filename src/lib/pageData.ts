import { getSheet } from "./cms";

/**
 * Dades que necessiten Header (Products, Categories, Phrases) i Footer
 * (InfoPages) EN TOTES LES PÀGINES. Es demanen un sol cop per petició,
 * en servidor, i es reparteixen cap avall — mai es tornen a demanar
 * des del navegador.
 *
 * Si el CMS falla per qualsevol motiu, es retornen arrays buits (cada
 * component ja sap fer servir el seu propi contingut de reserva quan
 * rep un array buit) — una pàgina mai s'ha de trencar per això.
 */
export async function getSharedLayoutData(lang: string) {
	try {
		const [products, categories, phrases, infoPages] = await Promise.all([
			getSheet<any>("Products", lang),
			getSheet<any>("Categories", lang),
			getSheet<any>("Phrases", lang),
			getSheet<any>("InfoPages", lang),
		]);
		return {
			products: Array.isArray(products) ? products : [],
			categories: Array.isArray(categories) ? categories : [],
			phrases: Array.isArray(phrases) ? phrases : [],
			infoPages: Array.isArray(infoPages) ? infoPages : [],
		};
	} catch (err) {
		console.error("[getSharedLayoutData] Error carregant dades compartides del CMS:", err);
		return { products: [], categories: [], phrases: [], infoPages: [] };
	}
}
