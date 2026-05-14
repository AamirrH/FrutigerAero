const reliveButton = document.getElementById("reliveButton");
const startupSound = document.getElementById("startupSound");
const fadeScreen = document.getElementById("fade-screen");

function startTeleport() {
  document.body.classList.add("teleporting");
  startupSound.volume = 0.6;
  startupSound.play();

  setTimeout(() => {
    fadeScreen.classList.add("fade-in");
  }, 1000);

  setTimeout(() => {
    window.location.href = "landingpageFA.html";
  }, 5000);
}

reliveButton.addEventListener("click", startTeleport);
