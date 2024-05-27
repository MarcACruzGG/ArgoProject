function iniciarApp(){loadIonicons(),toggleMenuHamburguesa()}document.addEventListener("DOMContentLoaded",(function(){iniciarApp(),inicializarGaleria(),setUpCarruselControls(),addTouchEventsToCarrusel()}));const descripciones=["JUEGOS DE MESA LICENCIA DISNEY PEGUE 4 ESQUINAS","LOTERÍA DISNEY PEGUE 4 ESQUINAS TINTAS UV","ROMPECABEZAS IMPRESIÓN UV SUAJES ESPECIALES","CAJA PLEGADIZA TINTAS DIRECTAS","CAJILLA MICROCORRUGADO E TINTAS DIRECTAS","CAJILLA PERFUME BARNIZ CONTRASTE LISO","CAJILLA PERFUME DISNEY PLEGADIZA","JUEGO DE MESA IMPRESIÓN CRC BARNIZ UV"];function inicializarGaleria(){document.querySelectorAll(".carrusel img").forEach(t=>{t.addEventListener("click",(function(){mostrarImagen(this.id)}))})}function mostrarImagen(t){const e=`/build/img/Jugueteria/${t}.png`,n=document.createElement("div");n.className="overlay",n.innerHTML=`\n    <div class="overlay-content">\n      <div class="img-zoom-container">\n        <img id="img-${t}" src="${e}" alt="Imagen Galeria ${t}" style="width: 200; height: 300;">\n      </div>\n      <p>${descripciones[t-1]}</p>\n    </div>\n  `,n.addEventListener("click",(function(){n.remove(),document.body.classList.remove("fijar-body")})),document.body.appendChild(n),document.body.classList.add("fijar-body"),activateZoom("img-"+t)}function getMousePos(t,e){const n=e.getBoundingClientRect();return{x:t.clientX-n.left,y:t.clientY-n.top}}function getPositionX(t){return t.touches?t.touches[0].clientX:null}function setUpCarruselControls(){document.querySelectorAll(".carrusel-arrow").forEach(t=>{t.addEventListener("click",processingButton)})}function processingButton(t){const e=t.currentTarget,n=e.closest(".carrusel-list"),o=n.querySelector(".carrusel-track"),r=o.querySelectorAll(".carrusel"),i=n.offsetWidth;let s=getTranslateX(o);const a=-(r.length*r[0].offsetWidth-i);"button-prev"===e.dataset.button?s=Math.min(s+i,0):"button-next"===e.dataset.button&&(s=Math.max(s-i,a)),o.style.transform=`translateX(${s}px)`}function getTranslateX(t){const e=window.getComputedStyle(t),n=e.transform||e.webkitTransform||e.mozTransform;if("none"===n)return 0;{const t=n.match(/matrix.*\((.+)\)/)[1].split(", ");return parseInt(t[4])}}function addTouchEventsToCarrusel(){const t=document.getElementById("track"),e=document.querySelector(".carrusel-list").offsetWidth,n=t.querySelectorAll(".carrusel"),o=-(n.length*n[0].offsetWidth-e);let r=0,i=getTranslateX(t),s=i;t.addEventListener("touchstart",e=>{const n=getPositionX(e);null!==n&&(r=n,s=getTranslateX(t),t.style.transition="none")}),t.addEventListener("touchmove",e=>{const n=getPositionX(e);if(null!==n){e.preventDefault();const a=n-r;i=Math.max(Math.min(s+a,0),o),t.style.transform=`translateX(${i}px)`}}),t.addEventListener("touchend",()=>{t.style.transition="transform 0.5s ease-in-out"})}
//# sourceMappingURL=jugueteria.js.map
