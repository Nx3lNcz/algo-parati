





document.addEventListener("DOMContentLoaded", () => {

  // ==========================================
  // MÚSICA
  // ==========================================

  const musica = document.getElementById("musica-office");
  const btnMusica = document.getElementById("btn-musica");

  if (musica && btnMusica) {

    musica.loop = true;
    musica.volume = 0.5;

    function actualizarBotonMusica() {
      const reproduciendo = !musica.paused;

      btnMusica.textContent = reproduciendo
        ? "🔊 SILENCIAR"
        : "🎵 ACTIVAR MÚSICA";

      btnMusica.setAttribute(
        "aria-pressed",
        String(reproduciendo)
      );
    }

    btnMusica.addEventListener("click", async () => {

      if (!musica.paused) {
        musica.pause();
        return;
      }

      btnMusica.textContent = "⏳ CARGANDO MÚSICA...";

      try {
        musica.muted = false;
        musica.volume = 0.5;

        await musica.play();

        actualizarBotonMusica();

      } catch (error) {

        console.error("Error de reproducción:", error);

        if (error.name === "NotSupportedError") {
          btnMusica.textContent = "⚠️ FORMATO NO COMPATIBLE";
        } else if (error.name === "NotAllowedError") {
          btnMusica.textContent = "⚠️ REPRODUCCIÓN BLOQUEADA";
        } else {
          btnMusica.textContent = "⚠️ ERROR DE AUDIO";
        }

      }
    });

    musica.addEventListener("play", actualizarBotonMusica);
    musica.addEventListener("pause", actualizarBotonMusica);

    musica.addEventListener("error", () => {
      console.error(
        "No se pudo cargar el audio:",
        musica.currentSrc,
        musica.error
      );

      btnMusica.textContent = "⚠️ AUDIO NO DISPONIBLE";
    });

    actualizarBotonMusica();

  } else {
    console.error(
      "No se encontró musica-office o btn-musica en el HTML."
    );
  }

 

  const carpeta = document.getElementById("carpeta");
  const portada = document.getElementById("carpeta-portada");
  const carta = document.getElementById("hoja-carta");

  const btnInvestigar = document.getElementById("btn-investigar");
  const btnVolver = document.getElementById("btn-volver");
  const btnSiguiente = document.getElementById("btn-siguiente");

  const paginas = document.querySelectorAll(".pagina-carta");

  const btnAnterior = document.getElementById("pagina-anterior");
  const btnPaginaSiguiente = document.getElementById("pagina-siguiente");
  const contador = document.getElementById("contador-paginas");

  let paginaActual = 0;
  let abriendo = false;

  

  if (paginas.length && btnAnterior && btnPaginaSiguiente && contador) {

    function mostrarPagina(numero) {

      if (numero < 0 || numero >= paginas.length) {
        return;
      }

      paginas.forEach((pagina, indice) => {
        pagina.classList.toggle("activa", indice === numero);
      });

      paginaActual = numero;

      contador.textContent =
        `${paginaActual + 1} / ${paginas.length}`;

      btnAnterior.disabled = paginaActual === 0;

      btnPaginaSiguiente.disabled =
        paginaActual === paginas.length - 1;
    }

    btnAnterior.addEventListener("click", () => {
      mostrarPagina(paginaActual - 1);

      carta?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    btnPaginaSiguiente.addEventListener("click", () => {
      mostrarPagina(paginaActual + 1);

      carta?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    mostrarPagina(0);

    // ==========================================
    // ABRIR Y CERRAR EXPEDIENTE
    // ==========================================

    if (
      carpeta &&
      portada &&
      carta &&
      btnInvestigar &&
      btnVolver &&
      btnSiguiente
    ) {

      btnInvestigar.addEventListener("click", () => {

        if (abriendo) return;

        abriendo = true;
        btnInvestigar.disabled = true;

        mostrarPagina(0);

        carpeta.classList.add("abierta");

        setTimeout(() => {

          portada.classList.add("oculto");

          carta.classList.remove("oculto");
          carta.classList.add("visible");
          carta.setAttribute("aria-hidden", "false");
          carta.inert = false;

          btnVolver.classList.remove("oculto");
          btnSiguiente.classList.remove("oculto");

          abriendo = false;

          carta.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }, 850);
      });

      btnVolver.addEventListener("click", () => {

        carta.classList.add("oculto");
        carta.classList.remove("visible");

        carta.setAttribute("aria-hidden", "true");
        carta.inert = true;

        carpeta.classList.remove("abierta");
        portada.classList.remove("oculto");

        btnInvestigar.disabled = false;

        btnVolver.classList.add("oculto");
        btnSiguiente.classList.add("oculto");

        mostrarPagina(0);

        carpeta.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      });

    } else {
      console.warn(
        "Faltan elementos de la carpeta en periodico.html."
      );
    }

  } else {
    console.warn(
      "Faltan elementos para navegar entre las hojas."
    );
  }

});
