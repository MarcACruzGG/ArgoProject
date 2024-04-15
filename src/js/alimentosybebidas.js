document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        loadIonicons();
        toggleMenu();
        mostrarTextoMenu();
        duplicarLogosParaCarruselInfinito();
        toggleMenuHamburguesa();
        iniciarSwiper();
        cargarDatosGaleria(); // Esto ahora solo carga datos al inicio
        crearGaleria(); // No modifica esta función
    
}

function iniciarSwiper() {
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
        },
        loop: true
    });
}


async function cargarDatosGaleria() {
    try {
        const response = await fetch('/build/json/alimentosybebidas.json');
        imagenesInfo = await response.json();
    } catch (error) {
        console.error("Error al cargar datos de la galería: ", error);
    }
}

// Función original sin modificaciones
function crearGaleria() {
    const galeria = document.querySelector('.swiper-wrapper');

    for (let i = 1; i <= 15; i++) {
        const imagen = document.createElement('div');
        imagen.className = 'swiper-slide';
        imagen.innerHTML = `<img loading="lazy" width="200" height="300" src="/build/img/galeria/${i}.png" alt="Imagen Galería ${i}">`;
        imagen.onclick = () => mostrarImagen(i); // Mantiene la función original
        galeria.appendChild(imagen);
    }
}

// Modificada para usar la información precargada
function mostrarImagen(id) {
    const info = imagenesInfo.find(imagen => imagen.id === id); // Encuentra la información correcta basada en el ID
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <p>${info ? info.descripcion : 'Descripción no disponible'}</p>
        </div>
    `;
    overlay.onclick = function() {
        overlay.remove();
        document.body.classList.remove('fijar-body');
    };

    document.body.appendChild(overlay);
    document.body.classList.add('fijar-body');
}