document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
        loadIonicons();
        duplicarLogosParaCarruselInfinito();
        toggleMenuHamburguesa();
        toggleMenu();
        mostrarInfoModal();
        loadIonicons();
        scrollNav();
        navegacionFija();

}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreLogos = document.querySelector('.contenedor-logos');
    const body = document.querySelector('body');

    window.addEventListener('scroll',function(){
        if(sobreLogos.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click',function(e){
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth' });

        });
    });
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




function toggleMenu() {
let menuToggle = document.querySelector(".menuToggle");
let menu = document.querySelector(".menu");
if (menuToggle && menu) {
    menuToggle.onclick = function () {
        menu.classList.toggle("active");
    };
}
}