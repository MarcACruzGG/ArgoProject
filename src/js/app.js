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
    const menuItems = document.querySelectorAll('.menu li');
    const textoMenu = document.querySelector('.texto-menu');

    const textos = [
        "Misión-Vision", "Políticas", "Certificados", "Equipo", 
        "Calidad", "Procesos", "Presupuesto", "Volumen de trabajo"
    ];

    menuItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            textoMenu.textContent = textos[index];
        });

        item.addEventListener('mouseout', () => {
            textoMenu.textContent = ""; // O cualquier texto predeterminado si prefieres
        });
    });
}