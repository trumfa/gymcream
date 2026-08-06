import type { APIRoute } from 'astro';

export const prerender = false;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lidWyRrdF40c7ANG';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'f0c9acfbb6f0f157650984e9f4405879e01a44b4';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const errorParam = url.searchParams.get('error');

    if (errorParam || !code) {
        return new Response(`
            <!DOCTYPE html>
            <html lang="ca">
            <head>
                <meta charset="UTF-8">
                <title>Error d'Autenticació - Gym Cream</title>
                <style>
                    body { background-color: #09090b; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { background: #18181b; border: 1px solid #27272a; padding: 2rem; border-radius: 8px; text-align: center; max-width: 400px; }
                    h2 { color: #ef4444; margin-top: 0; }
                    button { background: #ffe600; color: #000; font-weight: bold; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Error d'Autenticació</h2>
                    <p>No s'ha pogut completar l'inici de sessió amb GitHub (${errorParam || 'Codi no trobat'}).</p>
                    <button onclick="window.close()">Tancar Finestra</button>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code: code
            })
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error || !tokenData.access_token) {
            throw new Error(tokenData.error_description || 'No s\'ha pogut obtenir el token d\'accés');
        }

        // Fetch GitHub user profile
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${tokenData.access_token}`,
                'User-Agent': 'GymCream-CMS-App'
            }
        });

        if (!userResponse.ok) {
            throw new Error('Error al recollir la informació de perfil de GitHub');
        }

        const githubUser = await userResponse.json();

        const userData = {
            id: githubUser.id,
            login: githubUser.login,
            name: githubUser.name || githubUser.login,
            avatar_url: githubUser.avatar_url,
            html_url: githubUser.html_url,
            authenticatedAt: new Date().toISOString()
        };

        return new Response(`
            <!DOCTYPE html>
            <html lang="ca">
            <head>
                <meta charset="UTF-8">
                <title>Inici de sessió correcte - Gym Cream</title>
                <style>
                    body { background-color: #09090b; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { background: #18181b; border: 1px solid #ffe600; padding: 2rem; border-radius: 8px; text-align: center; max-width: 400px; box-shadow: 0 0 20px rgba(255,230,0,0.15); }
                    .avatar { width: 64px; height: 64px; border-radius: 50%; border: 2px solid #ffe600; margin-bottom: 12px; }
                    h2 { color: #ffe600; margin: 0 0 8px 0; font-size: 1.25rem; }
                    p { color: #a1a1aa; font-size: 0.875rem; margin: 0; }
                </style>
            </head>
            <body>
                <div class="card">
                    <img src="${userData.avatar_url}" class="avatar" alt="${userData.login}" />
                    <h2>Benvingut/da, ${userData.name}!</h2>
                    <p>Autenticació amb GitHub verificada amb èxit.</p>
                </div>
                <script>
                    const userData = ${JSON.stringify(userData)};
                    if (window.opener) {
                        window.opener.postMessage({ type: 'GITHUB_AUTH_SUCCESS', user: userData }, '*');
                        setTimeout(() => {
                            window.close();
                        }, 800);
                    } else {
                        localStorage.setItem('gymcream_admin_user', JSON.stringify(userData));
                        window.location.href = '/admin/';
                    }
                </script>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });

    } catch (err: any) {
        return new Response(`
            <!DOCTYPE html>
            <html lang="ca">
            <head>
                <meta charset="UTF-8">
                <title>Error d'Autenticació - Gym Cream</title>
                <style>
                    body { background-color: #09090b; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                    .card { background: #18181b; border: 1px solid #ef4444; padding: 2rem; border-radius: 8px; text-align: center; max-width: 400px; }
                    h2 { color: #ef4444; margin-top: 0; }
                    p { color: #a1a1aa; font-size: 0.875rem; }
                    button { background: #ffe600; color: #000; font-weight: bold; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; margin-top: 15px; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Error d'Autenticació</h2>
                    <p>${err.message || 'Error desconegut'}</p>
                    <button onclick="window.close()">Tancar Finestra</button>
                </div>
            </body>
            </html>
        `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
    }
};
