export default function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const clientId = process.env.OAUTH_CLIENT_ID || 'Ov23lidWyRrdF40c7ANG';
  const redirectUri = `${protocol}://${host}/api/callback`;
  
  const githubUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(redirectUri)}`;
  
  res.redirect(302, githubUrl);
}
