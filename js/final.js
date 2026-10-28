
document.addEventListener("DOMContentLoaded", () => {

  // =====================================
  // ELEMENTOS
  // =====================================

  const pantallaInicio =
    document.getElementById("pantalla-inicio");

  const pantallaSecuencia =
    document.getElementById("pantalla-secuencia");

  const pantallaPregunta =
    document.getElementById("pantalla-pregunta");

  const pantallaSi =
    document.getElementById("pantalla-si");

  const pantallaPensarlo =
    document.getElementById("pantalla-pensarlo");

  const btnComenzar =
    document.getElementById("btn-comenzar");

  const btnSi =
    document.getElementById("btn-si");

  const btnPensarlo =
    document.getElementById("btn-pensarlo");

  const frase =
    document.getElementById("frase");

  const petalos =
    document.getElementById("petalos");

  const corazones =
    document.getElementById("corazones");

  // =====================================
  // FRASES ROMÁNTICAS
  // =====================================

  
const frases = [
  "Dicen que las mejores historias comienzan cuando menos lo esperas...",

  "Yo no esperaba encontrarte aquel día en el gimnasio.",

  "Pero desde que te conocí, algo en mí comenzó a cambiar.",

  "Si esta fuera una historia de K-drama, este sería el momento de la confesión..."
];

  // Milisegundos que dura cada frase
  const duracionFrase = 4800;

  let secuenciaActiva = false;
  let lluviaIntensa = false;

  // =====================================
  // CAMBIAR PANTALLA
  // =====================================

  function mostrarPantalla(pantalla) {

    const pantallas = [
      pantallaInicio,
      pantallaSecuencia,
      pantallaPregunta,
      pantallaSi,
      pantallaPensarlo
    ];

    pantallas.forEach(elemento => {
      elemento.classList.add("oculto");
    });

    pantalla.classList.remove("oculto");
  }

  // =====================================
  // CREAR PÉTALOS
  // =====================================

  function crearPetalo() {

    const petalo = document.createElement("span");

    petalo.classList.add("petalo");

    petalo.style.left =
      `${Math.random() * 100}%`;

    petalo.style.width =
      `${Math.random() * 9 + 8}px`;

    petalo.style.height =
      `${Math.random() * 10 + 12}px`;

    petalo.style.setProperty(
      "--desplazamiento",
      `${Math.random() * 260 - 130}px`
    );

    const duracion = lluviaIntensa
      ? Math.random() * 4 + 4
      : Math.random() * 6 + 7;

    petalo.style.animationDuration =
      `${duracion}s`;

    petalos.appendChild(petalo);

    setTimeout(() => {
      petalo.remove();
    }, duracion * 1000);
  }

  // =====================================
  // CREAR CORAZONES
  // =====================================

  function crearCorazon() {

    const corazon = document.createElement("span");

    corazon.classList.add("corazon-flotante");

    const simbolos = ["❤️", "💗", "💕", "🌸"];

    corazon.textContent =
      simbolos[Math.floor(Math.random() * simbolos.length)];

    corazon.style.left =
      `${Math.random() * 100}%`;

    corazon.style.fontSize =
      `${Math.random() * 22 + 18}px`;

    const duracion =
      Math.random() * 3 + 4;

    corazon.style.animationDuration =
      `${duracion}s`;

    corazones.appendChild(corazon);

    setTimeout(() => {
      corazon.remove();
    }, duracion * 1000);
  }

  // =====================================
  // ESPERAR
  // =====================================

  function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // =====================================
  // SECUENCIA DE CONFESIÓN
  // =====================================

  async function iniciarSecuencia() {

    if (secuenciaActiva) return;

    secuenciaActiva = true;

    mostrarPantalla(pantallaSecuencia);

    for (let i = 0; i < frases.length; i++) {

      frase.classList.remove("aparecer");
      frase.classList.add("desaparecer");

      await esperar(850);

      frase.textContent = frases[i];

      frase.classList.remove("desaparecer");
      frase.classList.add("aparecer");

      await esperar(duracionFrase);
    }

    frase.classList.remove("aparecer");
    frase.classList.add("desaparecer");

    await esperar(1000);

    mostrarPantalla(pantallaPregunta);
  }

  // =====================================
  // RESPUESTA SÍ
  // =====================================

  function responderSi() {

    mostrarPantalla(pantallaSi);

    lluviaIntensa = true;

    for (let i = 0; i < 40; i++) {
      setTimeout(crearCorazon, i * 130);
    }
  }

  // =====================================
  // NECESITO PENSARLO
  // =====================================

  function responderPensarlo() {
    mostrarPantalla(pantallaPensarlo);
  }

  // =====================================
  // BOTONES
  // =====================================

  btnComenzar.addEventListener(
    "click",
    iniciarSecuencia
  );

  btnSi.addEventListener(
    "click",
    responderSi
  );

  btnPensarlo.addEventListener(
    "click",
    responderPensarlo
  );

  // =====================================
  // INICIAR PÉTALOS
  // =====================================

  setInterval(() => {
    crearPetalo();
  }, 280);

});
