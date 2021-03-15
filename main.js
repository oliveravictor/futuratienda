let carrito = [];

if (localStorage.getItem("carrito") != null) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}
document.getElementById("contador").innerHTML = carrito.length;

var productos;
$(document).ready(function () {
  $.get({
    url: "./data.json",
    dataType: "json",
    success: function (data) {
      productos = data;
      mostrarCards(productos);
    },
  });
});

function mostrarCards(prod) {
  let totalCards = "";
  for (i = 0; i < prod.length; i++) {
    totalCards += `
    <div class="cardsIndex">
       <div class="card" style="width: 400px">
      <img src="${prod[i].imagen}" class="card-img-top" />
        <div class="card-body">
           <h3>${prod[i].tipo}</h3>
              <p class="card-text"><h5>$${prod[i].precio}</h5></p>
          <button href="#!" class="btn btn-primary" onclick='sumar(${JSON.stringify(
            prod[i]
          )})'>  🛒 Agregar</button>
         
             </div>
         </div>
      `;
  }
  //document.getElementById("productos").innerHTML = totalCards;
  $("#productos").html(totalCards);
}

function borrarProd(index) {
  const newProd = [];
  for (let i = 0; i < carrito.length; i++) {
    if (i != index) {
      newProd.push(carrito[i]);
    }
  }

  localStorage.setItem("carrito", JSON.stringify(newProd));
  carrito = newProd;
  document.getElementById("contador").innerHTML = carrito.length;
  out();
  mostrarPrecio();
  mostrarProductos();
}

function sumar(prod) {
  carrito.push(prod);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  document.getElementById("contador").innerHTML = carrito.length;
  most();
  mostrarPrecio();
}

mostrarProductos();
function mostrarProductos() {
  let carritoProductos = $("#carrito-productos");
  let totalCarrito = "";
  for (i = 0; i < carrito.length; i++) {
    totalCarrito += `
    <div class="productosCarrito"">
      <div class="imagen"><img src="${carrito[i].imagen}" alt="${carrito[i].nombre}"></div>
      <h4 class="tipo">${carrito[i].tipo}</h4>
      <h4 class="precio">$${carrito[i].precio}</h4>
      <button  onclick='borrarProd("${i}")' class="btn btn-primary btnQuitar"
      >Eliminar</button>
      <button onclick='borrarProd("${carrito[i].id}")' class="btn btn-primary btnQuitar"><a class="btn-primary btnQuitar" href="compra.html">Comprar</a></button>
    </div>
      `;
  }

  //document.getElementById("posters").innerHTML = totalPosters;
  carritoProductos.html(totalCarrito);
}

mostrarPrecio();
function mostrarPrecio() {
  let acumuladorCarrito = 0;
  for (let i = 0; i < carrito.length; i++) {
    acumuladorCarrito += carrito[i].precio;
  }
  document.getElementById("precio-final").innerHTML = "$" + acumuladorCarrito;
}

mostrarPago();
function mostrarPago() {
  let pagoTotal = 0;
  for (let i = 0; i < carrito.length; i++) {
    pagoTotal += carrito[i].precio;
  }
  $("#pago-final").html("PAGAR $ " + pagoTotal);
}

mostrarCompra();
function mostrarCompra() {
  let compraCarrito = $("#compra-carrito");
  let totalCompra = "";
  for (i = 0; i < carrito.length; i++) {
    totalCompra += `
    <div class="productosCompra">
      <div class="imagenCompra"><img src="${carrito[i].imagen}" alt="${carrito[i].nombre}"></div>
      <h6 class="tipoCompra">${carrito[i].tipo}</h6>
      <h5 class="precioCompra">$${carrito[i].precio}</h5>
       <button class="btn btn-primary btnQuitar"><a id="pagar"  class="btn-primary btnQuitarCompra">Comprar</a></button>
    </div>
      `;
  }

  // document.getElementById("compra-carrito").innerHTML = totalCarrito;
  compraCarrito.html(totalCompra);
}

function most() {
  Swal.fire("¡Espectacular!", "Agregaste un producto a tu carrito!", "success");
}

function out() {
  Swal.fire({
    icon: "question",
    title: "Uh :(",
    text: "Quitaste un producto, ¿estás seguro?",
  });
}

document.write("null");
