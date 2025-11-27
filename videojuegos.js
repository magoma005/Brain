const filterBtn = document.getElementById('filterBtn');
const filterPanel = document.getElementById('filterPanel');
const applyFilters = document.getElementById('applyFilters');
const searchInput = document.getElementById('searchInput');
const games = document.querySelectorAll('.game-card');

filterBtn.addEventListener('click', () => {
  filterPanel.classList.toggle('visible');
});

applyFilters.addEventListener('click', () => {
  const consoleValue = document.getElementById('filterConsole').value.toLowerCase();
  const genreValue = document.getElementById('filterGenre').value.toLowerCase();
  const devValue = document.getElementById('filterDeveloper').value.toLowerCase();

  games.forEach(game => {
    const matchesConsole = !consoleValue || game.dataset.console.toLowerCase().includes(consoleValue);
    const matchesGenre = !genreValue || game.dataset.genre.toLowerCase().includes(genreValue);
    const matchesDev = !devValue || game.dataset.dev.toLowerCase().includes(devValue);
    game.style.display = (matchesConsole && matchesGenre && matchesDev) ? 'block' : 'none';
  });
});

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  games.forEach(game => {
    const name = game.querySelector('h3').textContent.toLowerCase();
    game.style.display = name.includes(term) ? 'block' : 'none';
  });
});
