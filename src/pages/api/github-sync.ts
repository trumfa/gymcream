export const prerender = false;

import type { APIRoute } from 'astro';
import { loadCmsStore, saveCmsStore } from '../../utils/cmsStore';

export const POST: APIRoute = async ({ request }) => {
  try {
    const payload = await request.json();

    // 1. Guardar persistentment al servidor central (memòria + fitxers cms_store.json)
    const updatedData = saveCmsStore(payload);

    // 2. Intentar Sincronització amb l'API de GitHub si hi ha token configurat
    const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT || process.env.GH_TOKEN;
    const githubRepo = process.env.GITHUB_REPO || 'jordibabi/gymcream';
    let githubSynced = false;
    let githubDetails = '';

    if (githubToken && githubRepo) {
      try {
        const filePath = 'cms_store.json';
        const getFileUrl = `https://api.github.com/repos/${githubRepo}/contents/${filePath}`;

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
          githubDetails = 'Sincronitzat correctament amb el repositori de GitHub!';
        } else {
          const errBody = await putRes.text();
          githubDetails = `Detall GitHub (${putRes.status}): ${errBody.substring(0, 80)}`;
        }
      } catch (err: any) {
        githubDetails = `Error al connectar amb GitHub: ${err.message}`;
      }
    } else {
      githubDetails = "Desat correctament al servidor central de la web.";
    }

    return new Response(JSON.stringify({
      success: true,
      githubSynced,
      githubDetails,
      message: "Tots els canvis s'han desat al servidor i divulgats a la xarxa!",
      updatedAt: updatedData.updatedAt
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err: any) {
    // Si hi hagués un error imprevist en parsejar JSON, encara retornem estat 200 amb error per no petar
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Error durant el guardat'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
