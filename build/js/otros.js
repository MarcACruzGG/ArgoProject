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
        crearGaleria();
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


function crearGaleria() {
    const galeria = document.querySelector('.swiper-wrapper');

    for (let i = 1; i <= 15; i++) {
        const imagen = document.createElement('div');
        imagen.className = 'swiper-slide';
        imagen.innerHTML = `
            <img loading="lazy" width="200" height="300" src="/build/img/galeria/${i}.png" alt="Imagen Galeria ${i}">
        `;
        imagen.onclick = () => mostrarImagen(i); // Agregar evento clic
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <p>Información sobre la imagen ${id}</p>
        </div>
    `;
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.remove('fijar-body'); 
        overlay.remove(); // Cierra el overlay al hacer clic en cualquier parte fuera de la imagen
    };

    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body'); 
}
