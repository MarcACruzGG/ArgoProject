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
  "ESTIRENO IMPRESIÓN EN TINTAS UV",
  "EMPAQUE MICROCORRUGADO FLAUTA E IMPRESO A SELECCIÓN DE COLOR BARNIZ UV A REGISTRO",
  "FAJILLA ALIMENTO CON COLD FOIL + BARNIZ CONTRASTE",
  "CARTERA EXHIBIDORA CON VENTANA DE PET",
  "FAJILLA CHOCOLATE TINTAS DIRECTAS + HOT STAMPING",
  "MINI DISPLAY PIRÁMIDE",
  "CAJA MICROCORRUGADA IN N OUT FLAUTA F CONTRASTE RUGOSO",
  "CAJILLA MUFFINS CON VENTANA DE PET ANGULADA",
  "MINI DISPLAY PLEGADIZA PEGUE DE 6 ESQUINAS",
  "CAJA MICROCORRUGADA ASA Y TACÓN PROMOCIONAL",
  "CHAROLA ALIMENTOS IMPRESIÓN TINTAS VEGETALES",
  "CAJA PLEGADIZA COLD FOIL + BARNIZ CONTRASTE",
  "CAJA PLEGADIZA CONTRASTE LISO FONDO AUTOMÁTICO",
  "CHAROLA EXHIBIDORA PEGUE DE 4 ESQUINAS",
  "READY TO DISPLAY 7X0 TINTAS",
  "MINI DISPLAY PIRÁMIDE",
  "CARTERA IMPRESIÓN TINTAS NEÓN",
  "SOBRE ALIMENTOS PARA CONGELADOS + BARNIZ ESPECIAL + ADHESIVO PARA CONGELADOS",
  "CAJILLA PIRÁMIDE METALIZADA + BARNIZ CONTRASTE RUGOSO Y HOT STAMPING",
  "CAJILLA PIRAMIDAL BARNIZ CONTRASTE",
  "EMPAQUE PLEGADIZO FONDO AUTOMÁTICO",
  "DISPLAY PLEGADIZO PARA TÉS",
  "EMPAQUE PLEGADIZO PARA ALIMENTOS BARNIZ ANTI HONGO",
  "DISPLAY PLEGADIZO 6X0 TINTAS",
  "CAJA MICROCORRUGADA CON VENTA DE PET",
  "CAJILLA  IMPRESA BARNIZ CONTRASTE RUGOSO Y HOT STAMPING",
  "CAJA MICROCORRUGADA FTA E IMPRESIÓN Y BARNIZ CONTRASTE LISO",
];

const imagenesEspeciales = [
  "/build/img/AlimentosyBebidas/Estructural/especial1.png",
  "/build/img/AlimentosyBebidas/Estructural/especial2.png",
  "/build/img/AlimentosyBebidas/Estructural/especial3.png",
  "/build/img/AlimentosyBebidas/Estructural/especial4.png",
  "/build/img/AlimentosyBebidas/Estructural/especial5.png",
  "/build/img/AlimentosyBebidas/Estructural/especial6.png",
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
    imagenSrc = imagenesEspeciales[id - 1];
  } else {
    imagenSrc = `/build/img/AlimentosyBebidas/${id}.png`;
  }
  
  const overlay = document.createElement("div");
  overlay.className = "overlay";
  overlay.innerHTML = `
    <div class="overlay-content">
      <img id="img-${id}" src="${imagenSrc}" alt="Imagen Galeria ${id}" style="width: 200; height: 300;">
      <p>${descripciones[id - 1]}</p>
    </div>
  `;
  overlay.addEventListener("click", function () {
    overlay.remove();
    document.body.classList.remove("fijar-body");
  });
  document.body.appendChild(overlay);
  document.body.classList.add("fijar-body");
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
