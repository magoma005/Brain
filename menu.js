const client_id = '17789fda6c7d4b88bcdce6b056f6148f';
const redirect_uri = "http://127.0.0.1:3000/menu.html";// coincide con lo que registraste
const scopes = 'user-top-read user-library-read'; // permisos que quieres

// Generar URL para autorizar
function getSpotifyAuthUrl() {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope: scopes,
    redirect_uri: redirect_uri,
    show_dialog: 'true'
  });
  return `${authEndpoint}?${params.toString()}`;
}

document.getElementById('loginSpotifyBtn').addEventListener('click', () => {
  window.location.href = getSpotifyAuthUrl();
});

// Después de autorizar, en la ruta callback necesitas captar el "code" que Spotify retorna.
// Aquí necesitarás un pequeño backend para intercambiar el code por un access_token.
// Luego usarás fetch para: GET https://api.spotify.com/v1/me/top/tracks?limit=3
// con header Authorization: Bearer ACCESS_TOKEN
