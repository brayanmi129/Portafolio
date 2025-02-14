var infoImagen = document.querySelector(".info-imagen");
var descripciondiv = document.querySelector(".info");
var boton = document.querySelector(".boton");
var mensaje = document.querySelector(".mensaje-oculto");


document.addEventListener("DOMContentLoaded", function() {
  const parametros = new URLSearchParams(window.location.search);
  const rutaImagen = parametros.get("imagen");
  const descripcciontxt = parametros.get("descripccion");
  const talla = parametros.get("talla");
  const pr = parametros.get("propietario");

  infoImagen.src = rutaImagen;

  descripciondiv.innerHTML = descripcciontxt + " <br> Size: " + talla + "<br> Owner: " + pr;
});

boton.addEventListener("click", function() {
  mensaje.style.display = 'block';
  setTimeout(() => {
    mensaje.style.display = 'none';
    }, 2000);
});

