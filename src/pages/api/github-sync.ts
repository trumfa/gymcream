export const prerender = false;

import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

const STORE_PATH = path.resolve(process.cwd(), 'cms_store.json');

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();

    // 1. Guardar localment en el fitxer de persistència cms_store.json
    let existingData: Record<string, any> = {};
    try {
      if (fs.existsSync(STORE_PATH)) {
        existingData = JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
      }
    } catch (e) {
      console.error('Error llegint store:', e);
    }

    const updatedData = { ...existingData, ...payload, updatedAt: new Date().toISOString() };
    fs.writeFileSync(STORE_PATH, JSON.stringify(updatedData, null, 2), 'utf-8');

    // 2. Tentar Sincronització amb l'API de GitHub si hi ha token configurat
    const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || process.env.GH_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'jordibabi/gymcream'; // Default o configurat
    let githubSynced = false;
    let githubDetails = '';

    if (githubToken && githubRepo) {
      try {
        const filePath = 'cms_store.json';
        const getFileUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;

        // Get current SHA if exists
        let sha = '';
        const getRes = await fetch(getFileUrl, {
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'User-Agent': 'GymCream-CMS-App',
            'Accept': 'application/vnd.github.v3+json'
          }
        });

        if (getRes.ok) {
          const fileMeta = await getRes.json();
          sha = fileMeta.sha;
        }

        const contentEncoded = Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64');

        const putRes = await fetch(getFileUrl, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'GymCream-CMS-App',
            'Accept': 'application/vnd.github.v3+json'
          },
          body: JSON.stringify({
            message: `CMS Update: Canvis desats des del Panell d'Administració (${new Date().toLocaleString('ca-ES')})`,
            content: contentEncoded,
            ...(sha ? { sha } : {})
          })
        });

        if (putRes.ok) {
          githubSynced = true;
          githubDetails = 'Sincronitzat correctament amb el repositori GitHub!';
        } else {
          const errBody = await putRes.text();
          githubDetails = `Error API GitHub (${putRes.status}): ${errBody.substring(0, 100)}`;
        }
      } catch (err: any) {
        githubDetails = `Error al connectar amb GitHub: ${err.message}`;
      }
    } else {
      githubDetails = "Canvis guardats al servidor central. (Per a autocommit automàtic a repositoris privats de GitHub, configura GITHUB_TOKEN a les variables d'entorn).";
    }

    return new Response(JSON.stringify({
      success: true,
      githubSynced,
      githubDetails,
      message: "Tots els canvis s'han desat al servidor i propagat a la xarxa!",
      updatedAt: updatedData.updatedAt
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Error durant el guardat a GitHub'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
