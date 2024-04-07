document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        loadIonicons();
        toggleMenu();
        duplicarLogosParaCarruselInfinito();
        activarMenuResponsive();
}

function loadIonicons() {
    // Cargar Ionicons module
    let scriptModule = document.createElement('script');
    scriptModule.type = 'module';
    scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
    document.body.appendChild(scriptModule);

    // Cargar Ionicons no module (fallback)
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

function activarMenuResponsive() {
    const hamburgerCheckbox = document.querySelector('.hamburger input[type="checkbox"]');
    const nav = document.querySelector('.navegacion-principal');
    const flags = document.querySelector('#flags'); // Selector para las banderas

    hamburgerCheckbox.addEventListener('change', function() {
        if (window.innerWidth < 768) {
            // Cambia la visualización de la navegación y las banderas basado en el checkbox
            const displayStyle = this.checked ? 'block' : 'none';
            nav.style.display = displayStyle;
            flags.style.display = displayStyle; // Aplica el mismo estilo a las banderas
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            // Restablece la visualización para pantallas más grandes
            nav.style.display = 'flex'; // Asume que la visualización predeterminada es flex
            flags.style.display = 'flex'; // Asume que la visualización predeterminada de las banderas es flex
        } else {
            // Asegura que tanto la navegación como las banderas se oculten en pantallas pequeñas si el checkbox no está marcado
            if (!hamburgerCheckbox.checked) {
                nav.style.display = 'none';
                flags.style.display = 'none';
            }
        }
    });
}