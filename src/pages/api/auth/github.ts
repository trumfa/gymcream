import type { APIRoute } from 'astro';

export const prerender = false;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'Ov23lidWyRrdF40c7ANG';

export const GET: APIRoute = async ({ request, redirect }) => {
    const url = new URL(request.url);
    const redirectUri = `${url.origin}/api/auth/github/callback/`;
    
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', GITHUB_CLIENT_ID);
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
    githubAuthUrl.searchParams.set('scope', 'read:user');

    // If request asks for JSON (e.g. client modal fetch), return the URL directly
    if (request.headers.get('accept')?.includes('application/json')) {
        return new Response(JSON.stringify({ url: githubAuthUrl.toString() }), {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return redirect(githubAuthUrl.toString(), 302);
};
