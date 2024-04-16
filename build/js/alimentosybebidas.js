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
        loop: true
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


function mostrarImagen(id) {
    const imagenSrc = `/build/img/AlimentosyBebidas/${id}.png`; // Construye la ruta de la imagen basándose en el id
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <img src="${imagenSrc}" alt="Imagen Galeria ${id}" width="200" height="300">
            <p>Información sobre la imagen ${id}</p>
        </div>
    `;
    overlay.addEventListener('click', function() {
        overlay.remove(); // Cierra el overlay al hacer clic en cualquier parte fuera de la imagen
        document.body.classList.remove('fijar-body'); 
    });

    document.body.appendChild(overlay);
    document.body.classList.add('fijar-body'); 
}


