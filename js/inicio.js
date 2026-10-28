


document.addEventListener("DOMContentLoaded", () => {

  const video = document.getElementById("video-fondo");
  const btnArrancar = document.getElementById("btn-arrancar");
  const pantallaArranque = document.getElementById("pantalla-arranque");
  const contenido = document.getElementById("contenido-bienvenida");
  const btnSonido = document.getElementById("btn-sonido");

  // ARRANCAR MOTORES
  btnArrancar.addEventListener("click", async () => {

    video.muted = false;
    video.volume = 1;

    try {
      await video.play();
    } catch (error) {
      console.warn("No se pudo reproducir el video:", error);
    }

    pantallaArranque.classList.add("oculto");
    contenido.classList.remove("oculto");

  });

  // ACTIVAR O DESACTIVAR SONIDO
  btnSonido.addEventListener("click", () => {

    video.muted = !video.muted;

    btnSonido.textContent = video.muted
      ? "🔇 ACTIVAR SONIDO"
      : "🔊 SILENCIAR";

    btnSonido.setAttribute(
      "aria-pressed",
      String(!video.muted)
    );

  });

});
