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