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
  "Descripción de la imagen 1 uno",
  "Descripción de la imagen 2 ds",
  "Descripción de la imagen 3 12",
  "Descripción de la imagen 4 1ad",
  "Descripción de la imagen 5 asdsad",
  "Descripción de la imagen 6 awdad",
  "Descripción de la imagen 7 awdad",
  "Descripción de la imagen 8 awdad",
  "Descripción de la imagen 9 awdad",
  "Descripción de la imagen 10 awdad",
  "Descripción de la imagen 11 awdad",
  "Descripción de la imagen 12 awdad",
  "Descripción de la imagen 13 awdad",
  "Descripción de la imagen 14 awdad",
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
  const imagenSrc = `/build/img/Tecnologia/${id}.png`;
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

function activateZoom(imgId) {
  const img = document.getElementById(imgId);
  const lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");
  img.parentElement.insertBefore(lens, img);

  const cx = 3;
  const cy = 3;
  lens.style.width = "10rem";
  lens.style.height = "10rem";

  lens.style.backgroundImage = `url('${img.src}')`;
  lens.style.backgroundRepeat = "no-repeat";
  lens.style.backgroundSize = `${(img.width * cx) / 10}rem ${
    (img.height * cy) / 10
  }rem`;
  lens.style.visibility = "visible";

  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("mousemove", moveLens);

  function moveLens(e) {
    e.preventDefault();
    const pos = getMousePos(e, img);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;
    img.addEventListener("mousemove", moveLens);

    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = `${x / 10}rem`;
    lens.style.top = `${y / 10}rem`;
    lens.style.backgroundPosition = `-${(x * cx) / 10}rem -${(y * cy) / 10}rem`;
  }

  function getCursorPos(e) {
    const a = img.parentElement.getBoundingClientRect();
    return {
      x: e.pageX - a.left - window.pageXOffset,
      y: e.pageY - a.top - window.pageYOffset,
    };
  }
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
