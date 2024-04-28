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
  const imagenSrc = `/build/img/Otros/${id}.png`;
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
  lens.style.backgroundSize = `${img.width * cx / 10}rem ${img.height * cy / 10}rem`;
  lens.style.visibility = "visible";

  img.addEventListener("mousemove", moveLens);
  lens.addEventListener("mousemove", moveLens);

  function moveLens(e) {
    e.preventDefault();
    const pos = getCursorPos(e);
    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;
    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = `${x / 10}rem`;
    lens.style.top = `${y / 10}rem`;
    lens.style.backgroundPosition = `-${x * cx / 10}rem -${y * cy / 10}rem`;
  }

  function getCursorPos(e) {
    const a = img.getBoundingClientRect();
    return {
      x: e.pageX - a.left - window.pageXOffset,
      y: e.pageY - a.top - window.pageYOffset
    };
  }
}

function setUpCarruselControls() {
  const buttons = document.querySelectorAll(".carrusel-arrow");
  buttons.forEach(button => {
    button.addEventListener("click", processingButton);
  });
}

function processingButton(event) {
  const btn = event.currentTarget;
  const carruselList = btn.closest(".carrusel-list");
  const track = carruselList.querySelector(".carrusel-track");
  const slides = track.querySelectorAll(".carrusel");
  const slideWidth = slides[0].offsetWidth;
  
  let currentTransform = getTranslateX(track);

  if (btn.dataset.button === "button-prev" && currentTransform < 0) {
    // Mover hacia la derecha
    let newPosition = currentTransform + slideWidth;
    track.style.transform = `translateX(${newPosition}px)`;
  } else if (btn.dataset.button === "button-next" && Math.abs(currentTransform) < (slideWidth * (slides.length - 1))) {
    // Mover hacia la izquierda
    let newPosition = currentTransform - slideWidth;
    track.style.transform = `translateX(${newPosition}px)`;
  }
}

function getTranslateX(element) {
  const style = window.getComputedStyle(element);
  const matrix = style.transform || style.webkitTransform || style.mozTransform;

  if (matrix === 'none') {
    return 0;
  } else {
    const values = matrix.match(/matrix.*\((.+)\)/)[1].split(', ');
    const x = values[4];
    return parseInt(x);
  }
}

function addTouchEventsToCarrusel() {
  const track = document.getElementById("track");
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = getTranslateX(track);

  track.addEventListener('touchstart', touchStart);
  track.addEventListener('touchend', touchEnd);
  track.addEventListener('touchmove', touchMove);

  function touchStart(e) {
    isDragging = true;
    startPos = getPositionX(e);
    currentTranslate = prevTranslate;
  }

  function touchMove(e) {
    if (isDragging) {
      const currentPosition = getPositionX(e);
      currentTranslate = prevTranslate + currentPosition - startPos;
      track.style.transform = `translateX(${currentTranslate}px)`;
    }
  }

  function touchEnd() {
    isDragging = false;
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100) { // Swiped left
      changeSlide('next');
    } else if (movedBy > 100) { // Swiped right
      changeSlide('prev');
    }
    prevTranslate = currentTranslate;
  }

  function getPositionX(e) {
    return e.touches[0].clientX;
  }

  function changeSlide(direction) {
    const slidesWidth = track.offsetWidth;
    const listWidth = document.querySelector('.carrusel-list').offsetWidth;
    if (direction === 'next' && Math.abs(currentTranslate) < slidesWidth - listWidth) {
      currentTranslate -= 200; // Assume each slide has a width of 200px
    } else if (direction === 'prev' && currentTranslate < 0) {
      currentTranslate += 200;
    }
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
}