document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
  inicializarGaleria();
  setUpCarruselControls();
  addTouchEventsToCarrusel();
});

function iniciarApp() {
  loadIonicons();
  toggleMenuHamburguesa();
}

const descripciones = [
  "CAJA PLEGADIZA CON VENTANA",
  "CAJILLA PLEGADIZA IMPRESIÓN TINTAS DIRECTAS + HOT STAMPING",
  "CAJILLA CON VENTANA DE PET ESQUINADA",
  "READY TO DISPLAY IMPRESIÓN UV",
  "EXHIBIDOR EN POLIPROPILENO IMPRESIÓN UV",
  "CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO",
  "CAJILLA IMPRESIÓN DIRECTA + BARNIZ UV",
  "CAJILLA LICENCIA DISNEY IMPRESA SOBRE PET + IMPRESIÓN ESPEJO",
  "CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL",
  "PLEGADIZA FONDO AUTOMÁTICO 6X0 TINTAS",
  "CAJILLA PLEGADIZA FONDO AUTOMÁTICO BARNIZ SOFT TOUCH",
  "CAJA PHARMA BARNIZ DE ALTA SEGURIDAD + COLD FOIL",
  "CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL",
  "CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL",
  "CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL",
  "CAJA PLEGADIZA + METALIZADO IMPRESIÓN UV + ALTO RELIEVE",
  "CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO",
  "CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO",
];

const imagenesAlternativas = [
  "/build/img/Salud/Estructural/especial1.png",
  "/build/img/Salud/Estructural/especial2.png",
  "/build/img/Salud/Estructural/especial3.png",
  "/build/img/Salud/Estructural/especial4.png",
  "/build/img/Salud/Estructural/especial5.png",
  "/build/img/Salud/Estructural/especial6.png",
];

function inicializarGaleria() {
  const imagenes = document.querySelectorAll(".carrusel img");
  imagenes.forEach((imagen) => {
    imagen.addEventListener("click", function () {
      mostrarImagen(this.id);
    });
  });
}

function mostrarImagen(id) {
  let imagenSrc;
  if (id <= 6) {
    imagenSrc = imagenesAlternativas[id - 1];
  } else {
    imagenSrc = `/build/img/Salud/${id}.png`;
  }
  
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-content">
      <div class="img-zoom-container">
        <img id="img-${id}" src="${imagenSrc}" alt="Imagen Galeria ${id}" style="width: 200; height: 300;">
      </div>
      <p>${descripciones[id - 1]}</p>
    </div>
  `;
  overlay.addEventListener("click", function () {
    overlay.remove();
    document.body.classList.remove("fijar-body");
  });
  document.body.appendChild(overlay);
  document.body.classList.add("fijar-body");
  activateZoom(`img-${id}`);
}

function getMousePos(e, img) {
  const rect = img.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function getPositionX(e) {
  return e.touches ? e.touches[0].clientX : null;
}

function setUpCarruselControls() {
  const buttons = document.querySelectorAll(".carrusel-arrow");
  buttons.forEach((button) => {
    button.addEventListener("click", processingButton);
  });
}

function processingButton(event) {
  const btn = event.currentTarget;
  const carruselList = btn.closest(".carrusel-list");
  const track = carruselList.querySelector(".carrusel-track");
  const carruselItems = track.querySelectorAll(".carrusel");
  const carruselWidth = carruselList.offsetWidth; 

  let currentTransform = getTranslateX(track);
  const maxTransform = -(
    carruselItems.length * carruselItems[0].offsetWidth -
    carruselWidth
  );

  if (btn.dataset.button === "button-prev") {
    currentTransform = Math.min(currentTransform + carruselWidth, 0);
  } else if (btn.dataset.button === "button-next") {
    currentTransform = Math.max(currentTransform - carruselWidth, maxTransform);
  }

  track.style.transform = `translateX(${currentTransform}px)`;
}

function getTranslateX(element) {
  const style = window.getComputedStyle(element);
  const matrix = style.transform || style.webkitTransform || style.mozTransform;

  if (matrix === "none") {
    return 0;
  } else {
    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
    return parseInt(values[4]);
  }
}

function addTouchEventsToCarrusel() {
  const track = document.getElementById("track");
  const carruselWidth = document.querySelector(".carrusel-list").offsetWidth;
  const carruselItems = track.querySelectorAll(".carrusel");
  const maxTransform = -(
    carruselItems.length * carruselItems[0].offsetWidth -
    carruselWidth
  );
  let startPos = 0;
  let currentTranslate = getTranslateX(track);
  let startTranslate = currentTranslate;

  track.addEventListener("touchstart", (e) => {
    const touchX = getPositionX(e);
    if (touchX !== null) {
      startPos = touchX;
      startTranslate = getTranslateX(track);
      track.style.transition = "none"; 
    }
  });

  track.addEventListener("touchmove", (e) => {
    const touchX = getPositionX(e);
    if (touchX !== null) {
      e.preventDefault();
      const diff = touchX - startPos;
      currentTranslate = Math.max(
        Math.min(startTranslate + diff, 0),
        maxTransform
      );
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
  });

  track.addEventListener("touchend", () => {
    track.style.transition = "transform 0.5s ease-in-out"; 
  });
}
