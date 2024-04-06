document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    loadIonicons();
    toggleMenu();
    cloneLogo();
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

function cloneLogo() {
    var logosSlide = document.querySelector('.logos-slide');
    var clones = logosSlide.cloneNode(true); // Clonamos el contenido de logos
    logosSlide.appendChild(clones); // Insertamos el clon al final del mismo contenedor .logos-slide
}

document.addEventListener('DOMContentLoaded', function() {
    cloneLogo(); // Llamamos a la función después de que el DOM esté completamente cargado
});