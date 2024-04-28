document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
    inicializarGaleria();
    setUpCarruselControls();
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
    const imagenes = document.querySelectorAll('.carrusel img'); 
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            mostrarImagen(this.id); 
        });
    });
}

function mostrarImagen(id) {
    const imagenSrc = `/build/img/Otros/${id}.png`;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <div class="img-zoom-container">
                <img id="img-${id}" src="${imagenSrc}" alt="Imagen Galeria ${id}" style="width: 200; height: 300;">
            </div>
            <p>${descripciones[id - 1]}</p>
        </div>
    `;
    overlay.addEventListener('click', function() {
        overlay.remove();
        document.body.classList.remove('fijar-body');
    });
    document.body.appendChild(overlay);
    document.body.classList.add('fijar-body');
    activateZoom(`img-${id}`);
}


function activateZoom(imgId) {
    const img = document.getElementById(imgId);
    const lens = document.createElement('div');
    lens.setAttribute('class', 'img-zoom-lens');
    img.parentElement.insertBefore(lens, img);

    const cx = 2; // Zoom factor for X
    const cy = 2; // Zoom factor for Y

    lens.style.backgroundImage = `url('${img.src}')`;
    lens.style.backgroundRepeat = 'no-repeat';
    lens.style.backgroundSize = `${img.width * cx / 10}rem ${img.height * cy / 10}rem`;
    lens.style.visibility = 'visible';

    img.addEventListener("mousemove", moveLens);
    lens.addEventListener("mousemove", moveLens);

    function moveLens(e) {
        e.preventDefault();
        const pos = getCursorPos(e);

        let x = pos.x - (lens.offsetWidth / 2);
        let y = pos.y - (lens.offsetHeight / 2);

        if (x > img.width - lens.offsetWidth) { x = img.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        lens.style.left = `${x / 10}rem`;
        lens.style.top = `${y / 10}rem`;
        lens.style.backgroundPosition = `-${x * cx / 10}rem -${y * cy / 10}rem`;
    }

    function getCursorPos(e) {
        const a = img.getBoundingClientRect();
        let x = e.pageX - a.left;
        let y = e.pageY - a.top;
        x -= window.pageXOffset;
        y -= window.pageYOffset;
        return {x: x, y: y};
    }
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

function setUpCarruselControls() {
    document.querySelectorAll('.carrusel-arrow').forEach(button => {
        button.addEventListener('click', function(event) {
            processingButton(event);
        });
    });
}

function processingButton(event) {
    const btn = event.currentTarget;
    const carruselList = btn.closest('.carrusel-list');
    const track = carruselList.querySelector('.carrusel-track');
    const carrusel = track.querySelectorAll('.carrusel');
    const carruselWidth = carrusel[0].offsetWidth;
    const trackWidth = track.offsetWidth;
    const listWidth = carruselList.offsetWidth;
    let leftPosition = track.style.left === "" ? 0 : parseFloat(track.style.left.slice(0, -2));
    if (btn.dataset.button === "button-prev") {
        if (leftPosition < 0) {
            track.style.left = `${leftPosition + carruselWidth}px`;
        }
    } else {
        if (Math.abs(leftPosition) < (trackWidth - listWidth)) {
            track.style.left = `${leftPosition - carruselWidth}px`;
        }
    }
}