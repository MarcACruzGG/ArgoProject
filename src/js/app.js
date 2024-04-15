document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        loadIonicons();
        toggleMenu();
        mostrarInfoModal();
        mostrarTextoMenu();
        duplicarLogosParaCarruselInfinito();
        toggleMenuHamburguesa();

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

function mostrarInfoModal() {
    const menuItems = document.querySelectorAll('.menu li .a-menu'); // Selecciona los divs con clase 'a-menu'
    const textos = [
        "Misión-Vision", "Políticas", "Certificados", "Equipo", 
        "Calidad", "Procesos", "Presupuesto", "Volumen de trabajo"
    ];

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.innerHTML = `
                <div class="modal-content">
                    <h2>${textos[index]}</h2>
                    <p>Descripción detallada para ${textos[index]}</p>
                    <button class="cerrar-modal">Cerrar</button>
                </div>
            `;
            const body = document.querySelector('body');
            body.appendChild(modalOverlay);
            body.classList.add('fijar-body'); 

            // Agregar evento para cerrar el modal
            modalOverlay.addEventListener('click', function(e) {
                if (e.target.classList.contains('cerrar-modal') || e.target === modalOverlay) {
                    modalOverlay.remove();
                    body.classList.remove('fijar-body');
                }
            });
        });
    });
}

function mostrarTextoMenu() {
    const menuItems = document.querySelectorAll('.menu li .a-menu'); // Selecciona los divs con clase 'a-menu'
    const textoMenu = document.querySelector('.texto-menu');

    const textos = [
        "Misión-Vision", "Políticas", "Certificados", "Equipo", 
        "Calidad", "Procesos", "Presupuesto", "Volumen de trabajo"
    ];

    menuItems.forEach((item, index) => {
        item.addEventListener('mouseover', () => {
            textoMenu.textContent = textos[index];
            textoMenu.style.opacity = '1'; // Hace visible el texto
            textoMenu.style.visibility = 'visible'; // Asegura que el texto sea visible
        });

        item.addEventListener('mouseout', () => {
            textoMenu.textContent = ""; // Limpia el texto
            textoMenu.style.visibility = 'hidden'; // Cambia la visibilidad
        });
    });
}



