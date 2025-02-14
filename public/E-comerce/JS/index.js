var productos = [
    {
      "nombre": "BLACK HOODIE",
      "talla": "M",
      "propietario":"Angie Miranda",
      "imagen": "Imagenes/capota-1.PNG",
      "imagenHover": "Imagenes/capota-2.PNG"

    },{
        "nombre": "WHITE T-SHIT",
        "talla": "S",
        "propietario":"Paula Legro",
        "imagen": "Imagenes/camisa-1.PNG ",
        "imagenHover": "Imagenes/camisa-2.PNG "
    },{
        "nombre": "OVERSIZE JUMPER",
        "talla": "S",
        "propietario":"Paula Legro",
        "imagen": "Imagenes/buzo-1.PNG",
        "imagenHover": "Imagenes/buzo-2.PNG"
    },{
        "nombre": "T-SHIRT OVERSIZE",
        "talla": "XL",
        "propietario":"Carlos Torres",
        "imagen": "Imagenes/camisa-4.PNG",
        "imagenHover": "Imagenes/camisa-3.PNG"
    },{
        "nombre": "BLUE T-SHIRT",
        "talla": "XL",
        "propietario":"Carlos Torres",
        "imagen": "Imagenes/OVERSIZE.PNG",
        "imagenHover": "Imagenes/OVERSIZE-2.PNG"
    },{
        "nombre": "WHITE TENNIS",
        "talla": "39",
        "propietario":"Andres Felipe",
        "imagen": "Imagenes/TENIS-1.PNG",
        "imagenHover": "Imagenes/TENIS-2.PNG"
    },{
        "nombre": "BLACK JEANS",
        "talla": "39",
        "propietario":"Santiago Vega",
        "imagen": "Imagenes/JEAN-1.PNG",
        "imagenHover": "Imagenes/JEAN-2.PNG"
    },{
        "nombre": "BLUE JEANS",
        "talla": "39",
        "propietario":"Santiago Vega",
        "imagen": "Imagenes/JEAN-3.PNG",
        "imagenHover": "Imagenes/JEAN-4.PNG"
    },{
        "nombre": "BLACK JACKET",
        "talla": "39",
        "propietario":"Marta Lopez",
        "imagen": "Imagenes/CHAQUETA-1.PNG",
        "imagenHover": "Imagenes/CHAQUETA-2.PNG"
    }
]

const imagenes = document.querySelectorAll(".imagen");


  imagenes.forEach(function(imagen,indice) {
    var nuevaRutaProducto = productos[indice].imagenHover;
    var rutaOriginalProducto = productos[indice].imagen;


    imagen.addEventListener("mouseover", function() {
      imagen.src = nuevaRutaProducto;
    });

    imagen.addEventListener("click", function() {
      var nombreproducto = productos[indice].nombre;
      var tallaproducto = productos[indice].talla;
      var propietario = productos[indice].propietario;
      var url = `info.html?imagen=${rutaOriginalProducto}&descripccion=${encodeURI(nombreproducto)}&talla=${encodeURI(tallaproducto)}&propietario=${encodeURIComponent(propietario)}`;
      window.location.href = url;
    });

    imagen.addEventListener("mouseout", function() {
      imagen.src = rutaOriginalProducto;
    });
  });