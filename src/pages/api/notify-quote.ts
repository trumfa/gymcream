export const prerender = false;

import type { APIRoute } from 'astro';
import { writeRow } from '../../lib/cms';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { author, quote } = body;

    if (!quote || !author) {
      return new Response(JSON.stringify({ error: 'Manca autor o frase' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Guarda la propuesta en Google Sheets como 'pending'. El status se fuerza
    // aquí, server-side — el cliente nunca puede decidir que su propia
    // propuesta quede 'approved' directamente.
    try {
      await writeRow('CommunityQuotes', 'create', {
        author,
        quote: `"${quote}"`,
        status: 'pending',
      });
    } catch (err) {
      console.error('Error guardando la propuesta en el CMS:', err);
      return new Response(JSON.stringify({ error: 'No s\'ha pogut desar la proposta' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const recipientEmail = 'jordibabi@gmail.com';
    console.log(`[EMAIL NOTIFICATION] Nova proposta de frase rebuda per a ${recipientEmail}:`);
    console.log(`Autor: @${author}`);
    console.log(`Frase: "${quote}"`);

    // Resend email dispatch if configured
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: 'GymCream Community <onboarding@resend.dev>',
            to: [recipientEmail],
            subject: `🔔 Nova proposta de frase Gymcreamer: @${author}`,
            html: `
              <div style="font-family: sans-serif; padding: 24px; background-color: #111111; color: #ffffff; border-radius: 8px; border: 1px solid #ffe600;">
                <h2 style="color: #ffe600; text-transform: uppercase; margin-top: 0;">Nova Frase Proposada</h2>
                <p style="font-size: 14px; color: #cccccc;">S'ha enviat una nova proposta de frase des del web Gym Cream:</p>
                <blockquote style="font-size: 18px; font-weight: bold; border-left: 4px solid #ffe600; padding-left: 12px; margin: 20px 0; color: #ffffff;">
                  "${quote}"
                </blockquote>
                <p style="font-size: 14px; color: #ffffff;"><strong>Autor:</strong> @${author}</p>
                <hr style="border: 0; border-top: 1px solid #333333; margin: 20px 0;" />
                <p style="font-size: 12px; color: #888888;">Pots aprovar o rebutjar aquesta frase des de la secció del CMS d'administració.</p>
              </div>
            `,
          }),
        });
      } catch (err) {
        console.error('Error enviant correu:', err);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Notificació registrada per a ${recipientEmail}`,
        recipient: recipientEmail,
        author,
        quote,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Error del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
