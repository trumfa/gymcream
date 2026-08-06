export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID || 'Ov23lidWyRrdF40c7ANG';
  const clientSecret = process.env.OAUTH_CLIENT_SECRET || 'f0c9acfbb6f0f157650984e9f4405879e01a44b4';

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code
      })
    });

    const data = await response.json();

    if (data.error || !data.access_token) {
      return res.status(400).send(data.error_description || 'Authentication failed');
    }

    const token = data.access_token;
    const content = JSON.stringify({ token, provider: 'github' });

    // HTML payload expected by Decap / Sveltia CMS window listener
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Autenticant amb GitHub...</title>
      </head>
      <body>
        <p style="font-family: sans-serif; text-align: center; margin-top: 40px;">
          Autenticació completada amb èxit. Tancant finestra...
        </p>
        <script>
          (function() {
            function receiveMessage(e) {
              console.log("receiveMessage", e);
              window.opener.postMessage(
                'authorization:github:success:${content}',
                e.origin
              );
            }
            window.addEventListener("message", receiveMessage, false);
            window.opener.postMessage("authorizing:github", "*");
          })();
        </script>
      </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
  } catch (err) {
    return res.status(500).send(err.message || 'Server Error');
  }
}
