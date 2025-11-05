require('dotenv').config();
const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Spotify API con tus credenciales
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});

// Servir archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Ruta de login — redirige a Spotify
app.get('/login', (req, res) => {
  const scopes = ['user-top-read', 'user-library-read'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.redirect(authorizeURL);
});

// Callback de Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const data = await spotifyApi.authorizationCodeGrant(code);

    const access_token = data.body['access_token'];
    const refresh_token = data.body['refresh_token'];

    console.log("✅ Access token obtenido correctamente.");

    // Redirige al frontend con el token en la URL
    res.redirect(`/menu.html?access_token=${access_token}`);
  } catch (err) {
    console.error("❌ Error en /callback:", err);
    res.send("Error al autenticar con Spotify. Revisa la consola del servidor.");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://127.0.0.1:${PORT}`);
});
