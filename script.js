// PIN correcto (puedes cambiarlo)
const correctPIN = "1234";

const loginBtn = document.getElementById("loginBtn");
const pinInput = document.getElementById("pinInput");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", checkPIN);
pinInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") checkPIN();
});

function checkPIN() {
  const userPIN = pinInput.value.trim();

  if (userPIN === correctPIN) {
    // Animación de entrada a "Mi Mundo"
    document.body.innerHTML = `
      <div class="welcome">
        <h1>Bienvenido a <span>Mi Mundo</span></h1>
        <p>Explora tu mente digital...</p>
      </div>
    `;

    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";

    setTimeout(() => {
      // Aquí más adelante cargaremos el menú principal
      document.body.innerHTML += `<p style="opacity:0.7;">(Menú próximamente...)</p>`;
    }, 2000);
  } else {
    errorMsg.textContent = "PIN incorrecto. Intenta de nuevo.";
    pinInput.value = "";
  }
}
