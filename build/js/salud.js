function iniciarApp(){loadIonicons(),toggleMenuHamburguesa()}document.addEventListener("DOMContentLoaded",(function(){iniciarApp(),inicializarGaleria(),setUpCarruselControls(),addTouchEventsToCarrusel()}));const descripciones=["CAJA PLEGADIZA CON VENTANA","CAJILLA PLEGADIZA IMPRESIÓN TINTAS DIRECTAS + HOT STAMPING","CAJILLA CON VENTANA DE PET ESQUINADA","READY TO DISPLAY IMPRESIÓN UV","EXHIBIDOR EN POLIPROPILENO IMPRESIÓN UV","CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO","CAJILLA IMPRESIÓN DIRECTA + BARNIZ UV","CAJILLA LICENCIA DISNEY IMPRESA SOBRE PET + IMPRESIÓN ESPEJO","CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL","PLEGADIZA FONDO AUTOMÁTICO 6X0 TINTAS","CAJILLA PLEGADIZA FONDO AUTOMÁTICO BARNIZ SOFT TOUCH","CAJA PHARMA BARNIZ DE ALTA SEGURIDAD + COLD FOIL","CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL","CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL","CAJA PLEGADIZA ESTUCHADO AUTOMÁTICO PEGUE LINEAL","CAJA PLEGADIZA + METALIZADO IMPRESIÓN UV + ALTO RELIEVE","CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO","CAJA PLEGADIZA PEGUE LINEAL ESTUCHADO AUTOMÁTICO"],imagenesAlternativas=["/build/img/Salud/Estructural/especial1.png","/build/img/Salud/Estructural/especial2.png","/build/img/Salud/Estructural/especial3.png","/build/img/Salud/Estructural/especial4.png","/build/img/Salud/Estructural/especial5.png","/build/img/Salud/Estructural/especial6.png"];function inicializarGaleria(){document.querySelectorAll(".carrusel img").forEach(t=>{t.addEventListener("click",(function(){mostrarImagen(this.id)}))})}function mostrarImagen(t){let e;e=t<=6?imagenesAlternativas[t-1]:`/build/img/Salud/${t}.png`;const n=document.createElement("div");n.className="overlay",n.innerHTML=`\n    <div class="overlay-content">\n      <div class="img-zoom-container">\n        <img id="img-${t}" src="${e}" alt="Imagen Galeria ${t}" style="width: 200; height: 300;">\n      </div>\n      <p>${descripciones[t-1]}</p>\n    </div>\n  `,n.addEventListener("click",(function(){n.remove(),document.body.classList.remove("fijar-body")})),document.body.appendChild(n),document.body.classList.add("fijar-body"),activateZoom("img-"+t)}function getMousePos(t,e){const n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}function getPositionX(t){return t.touches?t.touches[0].clientX:null}function setUpCarruselControls(){document.querySelectorAll(".carrusel-arrow").forEach(t=>{t.addEventListener("click",processingButton)})}function processingButton(t){const e=t.currentTarget,n=e.closest(".carrusel-list"),a=n.querySelector(".carrusel-track"),r=a.querySelectorAll(".carrusel"),i=n.offsetWidth;let s=getTranslateX(a);const o=-(r.length*r[0].offsetWidth-i);"button-prev"===e.dataset.button?s=Math.min(s+i,0):"button-next"===e.dataset.button&&(s=Math.max(s-i,o)),a.style.transform=`translateX(${s}px)`}function getTranslateX(t){const e=window.getComputedStyle(t),n=e.transform||e.webkitTransform||e.mozTransform;if("none"===n)return 0;{const t=n.match(/matrix.*\((.+)\)/)[1].split(", ");return parseInt(t[4])}}function addTouchEventsToCarrusel(){const t=document.getElementById("track"),e=document.querySelector(".carrusel-list").offsetWidth,n=t.querySelectorAll(".carrusel"),a=-(n.length*n[0].offsetWidth-e);let r=0,i=getTranslateX(t),s=i;t.addEventListener("touchstart",e=>{const n=getPositionX(e);null!==n&&(r=n,s=getTranslateX(t),t.style.transition="none")}),t.addEventListener("touchmove",e=>{const n=getPositionX(e);if(null!==n){e.preventDefault();const o=n-r;i=Math.max(Math.min(s+o,0),a),t.style.transform=`translateX(${i}px)`}}),t.addEventListener("touchend",()=>{t.style.transition="transform 0.5s ease-in-out"})}
//# sourceMappingURL=salud.js.map
