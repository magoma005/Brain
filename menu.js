// Al hacer clic en el botón de login, se redirige al backend que maneja la autenticación
document.getElementById('loginSpotifyBtn').addEventListener('click', () => {
  console.log("Redirigiendo al login de Spotify...");
  window.location.href = '/login';
});

// Cuando el usuario vuelve del callback, intentamos mostrar sus 3 canciones más escuchadas
window.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get('access_token');
  const songsContainer = document.getElementById('songs-container');

  if (!songsContainer) {
    console.error("❌ No se encontró el contenedor de canciones en el HTML.");
    return;
  }

  if (accessToken) {
    console.log("✅ Access token recibido:", accessToken.substring(0, 25) + "...");

    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=3', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      // Si la respuesta no es OK, mostramos el código del error
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Error de Spotify API:", response.status, errorText);
        songsContainer.innerHTML = `<p>Error al conectar con Spotify (${response.status}). Revisa la consola.</p>`;
        return;
      }

      const data = await response.json();
      console.log("🎵 Datos recibidos de Spotify:", data);

      if (data.items && data.items.length > 0) {
        songsContainer.innerHTML = data.items.map(track => `
          <div class="song">
            <img src="${track.album.images[0]?.url || ''}" alt="${track.name}">
            <p><b>${track.name}</b><br>${track.artists.map(a => a.name).join(', ')}</p>
          </div>
        `).join('');
      } else {
        songsContainer.innerHTML = "<p>No se encontraron canciones en tu cuenta.</p>";
      }

    } catch (err) {
      console.error("💥 Error al obtener canciones:", err);
      songsContainer.innerHTML = `<p>Error al obtener tus canciones: ${err.message}</p>`;
    }
  } else {
    console.warn("⚠️ No se encontró el access_token en la URL.");
  }
});
