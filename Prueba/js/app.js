document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    loadIonicons();
    duplicarLogosParaCarruselInfinito();
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

function duplicarLogosParaCarruselInfinito() {
    const todosLosSlides = document.querySelectorAll('.logos-slide');

    todosLosSlides.forEach(slide => {
        // Clona el contenido de logos para tener el doble de elementos
        const clonado = slide.cloneNode(true);
        slide.append(...clonado.childNodes); // Añade los clones al final del mismo contenedor
    });
}