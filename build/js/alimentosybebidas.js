document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
    inicializarGaleria();
});

function iniciarApp() {
        loadIonicons();
        toggleMenuHamburguesa();
        iniciarSwiper();
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
        loop: true,
        initialSlide: 0,
        on: {
            ready: function() {
                const swiper = this;
                swiper.slideTo(0, 0); // Comenzar desde la primera imagen (índice 0)
            }
        }
    });
}

function inicializarGaleria() {
    const imagenes = document.querySelectorAll('.swiper-slide img'); // Selecciona todas las imágenes en los slides
    
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            mostrarImagen(this.id); // 'this' se refiere al elemento img que fue clickeado
        });
    });
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

    // Añade más descripciones según el número de imágenes
];

function mostrarImagen(id) {
    const imagenSrc = `/build/img/AlimentosyBebidas/${id}.png`;
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <img src="${imagenSrc}" alt="Imagen Galeria ${id}" width="600" height="900">
            <p>${descripciones[id - 1]}</p>
        </div>
    `;
    overlay.addEventListener('click', function() {
        overlay.remove();
        document.body.classList.remove('fijar-body');
    });

    document.body.appendChild(overlay);
    document.body.classList.add('fijar-body');
}


