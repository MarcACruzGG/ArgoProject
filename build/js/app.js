document.addEventListener("DOMContentLoaded", function () {
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

function navegacionFija() {
  const barra = document.querySelector(".header");
  const sobreLogos = document.querySelector(".contenedor-logos");
  const body = document.querySelector("body");

  window.addEventListener("scroll", function () {
    if (sobreLogos.getBoundingClientRect().bottom < 0) {
      barra.classList.add("fijo");
      body.classList.add("body-scroll");
    } else {
      barra.classList.remove("fijo");
      body.classList.remove("body-scroll");
    }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function scrollNavF() {
  const enlaces = document.querySelectorAll(".navegacion-footer a");

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();

      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function loadIonicons() {
  let scriptModule = document.createElement("script");
  scriptModule.type = "module";
  scriptModule.src =
    "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js";
  document.body.appendChild(scriptModule);

  let scriptNoModule = document.createElement("script");
  scriptNoModule.noModule = true;
  scriptNoModule.src =
    "https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js";
  document.body.appendChild(scriptNoModule);
}

function duplicarLogosParaCarruselInfinito() {
  const todosLosSlides = document.querySelectorAll(".logos-slide");

  todosLosSlides.forEach((slide) => {
    const clonado = slide.cloneNode(true);
    slide.append(...clonado.childNodes);
  });
}

function toggleMenuHamburguesa() {
  const hamburgerCheckbox = document.querySelector(
    '.hamburger input[type="checkbox"]'
  );
  const nav = document.querySelector(".navegacion-principal");
  hamburgerCheckbox.addEventListener("change", function () {
    if (window.innerWidth < 768) {
      nav.style.display = this.checked ? "block" : "none";
    }
  });
  window.addEventListener("resize", function () {
    nav.style.display =
      window.innerWidth >= 768
        ? "flex"
        : hamburgerCheckbox.checked
        ? "block"
        : "none";
  });
}

function mostrarInfoModal() {
  const menuItems = document.querySelectorAll(".menu li .a-menu");
  const textos = [
    {
      titulo: "Misión-Vision",
      descripcion: `
        <p style="text-align:justify;">
        <strong>Misión:</strong> Nuestra misión es impulsar la excelencia en la industria gráfica a través de un equipo profesional comprometido con la mejora continua. Nos esforzamos por ofrecer soluciones creativas y de alta calidad que superen las expectativas de nuestros clientes, contribuyendo así al éxito de sus proyectos.
        <br><br>
        <strong>Visión:</strong> Nos proyectamos como líderes en el mercado de la industria gráfica, destacándonos por nuestros acabados especializados y nuestra capacidad para innovar constantemente. Buscamos ser reconocidos como un referente de excelencia y calidad en cada proyecto que realizamos, consolidando nuestra posición como el socio preferido de nuestros clientes.
        </p>
        `,
    },
    {
      titulo: "Políticas",
      descripcion: `
        <p style="text-align:justify;">
        Nos dedicamos a ofrecer productos y servicios que cumplen con los más altos estándares de calidad dentro de la Industria Gráfica Mexicana. Buscamos la excelencia en cada etapa de nuestro proceso productivo, mejorando continuamente nuestros procedimientos, servicios y sistema de gestión de calidad, en línea con los requisitos de la norma ISO 9001:2015. Nuestro compromiso es garantizar la satisfacción de nuestros clientes y consolidar nuestra reputación en el mercado como sinónimo de calidad y profesionalismo.
        </p>
        `,
    },
    {
      titulo: "Certificados",
      descripcion: `
        <p style="text-align:justify;">
        Nos enorgullecemos de contar con las siguientes certificaciones que respaldan nuestra dedicación a la excelencia y la responsabilidad social:
        <ul style="text-align:justify;">
            <li>ISO 9001:2015 - Garantiza la calidad de nuestros productos y servicios, cumpliendo con estándares internacionales.</li>
            <li>Responsabilidad Social (Disney) - Reconocimiento por nuestro compromiso con prácticas éticas y sostenibles en toda nuestra operación.</li>
            <li>SEDEX/SMETA 4 Pilares - Demuestra nuestro compromiso con la transparencia, la ética empresarial, los derechos laborales y el cuidado ambiental.</li>
            <li>Auditoria de Principios Rectores SGP Coca-Cola - Validación de nuestro compromiso con los principios de sostenibilidad y responsabilidad social en nuestra cadena de suministro.</li>
        </ul>
        <p style="text-align:justify; padding-top:1.5rem;">Estas certificaciones reflejan nuestra dedicación a ofrecer productos y servicios de la más alta calidad, mientras cumplimos con los más altos estándares de responsabilidad social y ambiental.</p>
        </p>
        `,
    },
    {
      titulo: "Equipo",
      descripcion: `
        <p style="text-align:justify;">
        Contamos con una variedad de maquinaria especializada que nos permite ofrecer soluciones de alta calidad en la industria gráfica:
        <ul style="text-align:justify;">
            <li><strong>Impresión:</strong> Roland 705 y 707 - Velocidad promedio de 12,000 pl/h, capaces de imprimir en papel de hasta 74 x 104 cm.</li>
            <li><strong>Suaje:</strong> Speria 106 E Autoplatine, Sanwa TRP1060-SE y Brausse 1050SF - Velocidad promedio de 3,500 pl/h, trabajan con papel de hasta 74 x 106 cm.</li>
            <li><strong>Pegue:</strong> Pegadoras Bobst, Vega y Smart - Capacidad de hasta 15,000 piezas/hora, con diferentes tamaños de papel.</li>
            <li><strong>Guillotinas:</strong> Polar 115E serie 6731851 y 7031430 - Capacidad de corte de hasta 1150 mm de ancho.</li>
        </ul>
        <p style="text-align:justify;"> Nuestra variedad de equipos nos permite adaptarnos a una amplia gama de proyectos, garantizando siempre calidad y eficiencia.
        </p>
        `,
    },
    {
      titulo: "Calidad",
      descripcion: `
        <p style="text-align:justify;">
        Nos comprometemos a garantizar la máxima calidad en cada etapa de producción:
        <br>
        • Realizamos inspecciones rigurosas de la materia prima, de cada proceso y del producto terminado.
        <br>
        • Nuestro objetivo es superar las expectativas de nuestros clientes y garantizar su completa satisfacción.
        </p>
        `,
    },
    {
      titulo: "Procesos",
      descripcion: `
        <p style="text-align:justify;">
          <strong>Control de Proyecto desde la Orden hasta la Impresión:</strong> Nuestro proceso comienza con una orden de producción meticulosamente revisada y circula a través de todas las áreas relevantes. Esta rigurosidad asegura la precisión desde la preprensa hasta la formación de suajes y la preparación de placas, culminando en la programación precisa para la impresión.
          <br><br>
          <strong>Materiales de Primera Calidad:</strong> Utilizamos solo los mejores barnices, tintas y sustratos, asegurando que cada producto cumpla con las expectativas de calidad de nuestros clientes. La flexibilidad en nuestro proceso permite adaptar la producción según las necesidades específicas de cada proyecto.
          <br><br>
          <strong>Empaquetado y Etiquetado Personalizado:</strong> Como toque final, ofrecemos servicios de empaquetado y etiquetado que pueden ser personalizados para satisfacer las especificaciones únicas de cada cliente. Este nivel de personalización refuerza la identidad de marca y la satisfacción del cliente.
        </p>
      `,
    },
    {
      titulo: "Presupuesto",
      descripcion: `
        <p style="text-align:justify;">
        Nuestro equipo especializado en cotizaciones se encarga de proporcionar precios justos y respuestas rápidas a las solicitudes de nuestros clientes:
        <br>
        • Utilizamos herramientas avanzadas y metodologías precisas para garantizar que cada presupuesto refleje el mejor valor posible.
        <br>
        • Consideramos tanto la calidad del trabajo como los tiempos de entrega requeridos para asegurar la total satisfacción del cliente.
        </p>
        `,
    },
    {
      titulo: "Volumen de trabajo",
      descripcion: `
        <p style="text-align:justify;">
       Como una industria manufacturera de tamaño mediano, nos centramos en la producción de alto volumen, lo que nos permite especializarnos en satisfacer las demandas de grandes pedidos.
        <br>
        • Garantizamos calidad y entrega a tiempo para proyectos de gran envergadura.
        <br>
        • Optamos por enfocarnos en proyectos de mayor volumen y pedidos más grandes, lo que nos permite ofrecer un servicio especializado y eficiente para este tipo de producciones.
        </p>
        `,
    },
  ];

  menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Verifica si ya existe un modal y lo elimina si es necesario
      let existingModal = document.querySelector(".modal-overlay");
      if (existingModal) {
        existingModal.remove();
      }

      // Crea y muestra el modal
      const modalOverlay = document.createElement("div");
      modalOverlay.className = "modal-overlay";
      modalOverlay.innerHTML = `
            <div class="modal-content">
                <h2>${textos[index].titulo}</h2>
                <p>${textos[index].descripcion}</p>
                <button class="cerrar-modal">Cerrar</button>
            </div>
        `;
      const body = document.querySelector("body");
      body.appendChild(modalOverlay);
      body.classList.add("fijar-body");

      // Agrega evento para cerrar el modal
      modalOverlay.addEventListener("click", function (e) {
        if (
          e.target.classList.contains("cerrar-modal") ||
          e.target === modalOverlay
        ) {
          modalOverlay.remove();
          body.classList.remove("fijar-body");
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
