import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { author, quote, website, honeypot } = body;

    // Protecció Anti-Spam Honeypot
    if (website || honeypot) {
      return new Response(JSON.stringify({ success: true, message: 'Spam descartat' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!quote || !author) {
      return new Response(JSON.stringify({ error: 'Manca autor o frase' }), {
        status: 400,
      });
    }

    // Neteja bàsica de text
    const cleanAuthor = String(author).replace(/<[^>]*>?/gm, '').trim().slice(0, 50);
    const cleanQuote = String(quote).replace(/<[^>]*>?/gm, '').trim().slice(0, 250);

    try {
      await writeRow('CommunityQuotes', 'create', {
        author: cleanAuthor,
        quote: `"${cleanQuote}"`,
        status: 'pending',
      });
    } catch (err) {
      console.warn("Avís: No s'ha pogut guardar la frase al CMS Sheet:", err);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Frase rebuda correctament',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error al notificar proposta de frase:', error);
    return new Response(
      JSON.stringify({ error: 'Error intern del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
