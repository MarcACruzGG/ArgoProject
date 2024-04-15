document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        toggleMenu();
        mostrarInfoModal();
        mostrarTextoMenu();
        loadIonicons();
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


function mostrarInfoModal() {
    const menuItems = document.querySelectorAll('.menu li .a-menu');
    const textos = [
        { titulo: "Misión-Vision", descripcion: "Descripción detallada de Misión-Vision" },
        { titulo: "Políticas", descripcion: "Descripción detallada de Políticas" },
        { titulo: "Certificados", descripcion: "Descripción detallada de Certificados" },
        { titulo: "Equipo", descripcion: "Descripción detallada de Equipo" },
        { titulo: "Calidad", descripcion: "Descripción detallada de Calidad" },
        { titulo: "Procesos", descripcion: "Descripción detallada de Procesos" },
        { titulo: "Presupuesto", descripcion: "Descripción detallada de Presupuesto" },
        { titulo: "Volumen de trabajo", descripcion: "Descripción detallada de Volumen de trabajo" }
    ];

    menuItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Verifica si ya existe un modal y lo elimina si es necesario
            let existingModal = document.querySelector('.modal-overlay');
            if (existingModal) {
                existingModal.remove();
            }

            // Crea y muestra el modal
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'modal-overlay';
            modalOverlay.innerHTML = `
                <div class="modal-content">
                    <h2>${textos[index].titulo}</h2>
                    <p>${textos[index].descripcion}</p>
                    <button class="cerrar-modal">Cerrar</button>
                </div>
            `;
            const body = document.querySelector('body');
            body.appendChild(modalOverlay);
            body.classList.add('fijar-body');

            // Agrega evento para cerrar el modal
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



function toggleMenu() {
    let menuToggle = document.querySelector(".menuToggle");
    let menu = document.querySelector(".menu");
    if (menuToggle && menu) {
        menuToggle.onclick = function () {
            menu.classList.toggle("active");
        };
    }
}