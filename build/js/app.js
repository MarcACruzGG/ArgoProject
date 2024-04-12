document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        loadIonicons();
        toggleMenu();
        mostrarTextoMenu();
        duplicarLogosParaCarruselInfinito();
        toggleMenuHamburguesa();
        toggleSelectorIdioma();
        iniciarSwiper();
        crearGaleria();
}

function loadIonicons() {
    let scriptModule = document.createElement('script');
    scriptModule.type = 'module';
    scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(scriptModule);

    let scriptNoModule = document.createElement('script');
    scriptNoModule.noModule = true;
    scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
    document.body.appendChild(scriptNoModule);
}

function toggleMenu() {
    let menuToggle = document.querySelector(".menuToggle");
    let menu = document.querySelector(".menu");
    if (menuToggle && menu) {
        menuToggle.onclick = function () {
            menu.classList.toggle("active");
        };
    }
}
        
function duplicarLogosParaCarruselInfinito() {
    const todosLosSlides = document.querySelectorAll('.logos-slide');

    todosLosSlides.forEach(slide => {
        const clonado = slide.cloneNode(true);
        slide.append(...clonado.childNodes); 
    });
}

function toggleMenuHamburguesa() {
    const hamburgerCheckbox = document.querySelector('.hamburger input[type="checkbox"]');
    const nav = document.querySelector('.navegacion-principal');
    hamburgerCheckbox.addEventListener('change', function() {
        if (window.innerWidth < 768) {
            nav.style.display = this.checked ? 'block' : 'none';
        }
    });
    window.addEventListener('resize', function() {
        nav.style.display = window.innerWidth >= 768 ? 'flex' : hamburgerCheckbox.checked ? 'block' : 'none';
    });
}

function toggleSelectorIdioma() {
    const hamburgerCheckbox = document.querySelector('.hamburger input[type="checkbox"]');
    const idioma = document.querySelector('.idioma');

    hamburgerCheckbox.addEventListener('change', function() {
        if (window.innerWidth < 768) {
            idioma.style.display = this.checked ? 'flex' : 'none';
        }
    });
    window.addEventListener('resize', function() {
        idioma.style.display = window.innerWidth >= 768 ? 'flex' : hamburgerCheckbox.checked ? 'flex' : 'none';
    });
}

function mostrarTextoMenu() {
    const menuItems = document.querySelectorAll('.menu li a');
    const textoMenu = document.querySelector('.texto-menu');

    const textos = [
        "Misión-Vision", "Políticas", "Certificados", "Equipo", 
        "Calidad", "Procesos", "Presupuesto", "Volumen de trabajo"
    ];

    menuItems.forEach((item, index) => {
        var i = 0;
        item.addEventListener('mouseover', () => {
            textoMenu.textContent = textos[index];
            textoMenu.style.opacity = '1'; // Hace visible el texto
            textoMenu.style.visibility = 'visible'; // Asegura que el texto sea visible
            i++;
            console.log(i);
        });

        item.addEventListener('mouseout', () => {
            textoMenu.textContent = ""; // Limpia el texto
            textoMenu.style.visibility = 'hidden'; // Cambia la visibilidad
            i++;
            console.log(i);

        });
    });
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

    for (let i = 1; i <= 60; i++) {
        const imagen = document.createElement('div');
        imagen.className = 'swiper-slide';
        imagen.innerHTML = `
            <img loading="lazy" width="200" height="300" src="/build/img/galeria/${i}.png" alt="Imagen Galeria ${i}">
        `;
    }
}

function mostrarImagen(id) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <img src="/build/img/galeria/${id}.png" alt="Imagen Galeria ${id}">
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
