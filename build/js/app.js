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
        scrollNavF();

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

function scrollNavF(){
    const enlaces = document.querySelectorAll('.navegacion-footer a');

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
    { titulo: "Misión-Vision", descripcion: "Nuestra misión es desarrollarnos como un equipo profesional en la industria gráfica, siempre comprometidos con la mejora continua. Con miras hacia el futuro, nuestra visión es posicionarnos como líderes del mercado, reconocidos por nuestros acabados especializados y soluciones innovadoras que marcan la diferencia." },
    { titulo: "Políticas", descripcion: "En ARGO Artes Gráficas S.A., estamos comprometidos con mantener los más altos estándares de calidad en la industria gráfica mexicana. Nos esforzamos por mejorar continuamente nuestros procesos y servicios, cumpliendo con los requisitos de la norma ISO 9001:2015 para garantizar la excelencia en todos nuestros productos y servicios." },
    { titulo: "Certificados", descripcion: "Nuestra operación se distingue por adherirse a estándares de excelencia, ética y sostenibilidad. Nos esforzamos por garantizar que cada aspecto de nuestro proceso cumple rigurosamente con las expectativas de calidad y responsabilidad social, asegurando un impacto positivo tanto en la comunidad como en el medio ambiente. Este compromiso nos permite entregar productos que no solo cumplen con las necesidades de nuestros clientes, sino que también contribuyen a un futuro más sostenible." },
    { titulo: "Equipo", descripcion: "Descripción detallada de Equipo" },
    { titulo: "Calidad", descripcion: "La calidad es nuestra prioridad. Llevamos a cabo inspecciones rigurosas de la materia prima, los procesos de producción y el producto terminado para asegurar que cada entrega supere las expectativas de nuestros clientes y garantice su completa satisfacción." },
    { titulo: "Procesos", descripcion: "Descripción detallada de Procesos" },
    { titulo: "Presupuesto", descripcion: "Contamos con un departamento especializado en cotizaciones que se enfoca en ofrecer precios justos y respuestas oportunas a las solicitudes de nuestros clientes. Este equipo utiliza herramientas avanzadas y metodologías precisas para garantizar que cada presupuesto refleje el mejor valor posible, considerando tanto la calidad del trabajo como los tiempos de entrega requeridos, asegurando así la satisfacción total del cliente." },
    { titulo: "Volumen de trabajo", descripcion: "DNos centramos exclusivamente en la producción a gran escala, con infraestructura diseñada para manejar altos volúmenes de producción de manera eficiente. Este enfoque nos permite garantizar calidad y entrega a tiempo, pero también significa que no manejamos proyectos de baja escala o pedidos pequeños." }
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