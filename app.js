
const carrito = [];

const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

cartBtn.addEventListener("click", abrirCarrito);
closeCart.addEventListener("click", cerrarCarrito);
overlay.addEventListener("click", cerrarCarrito);

function abrirCarrito() {
  cartPanel.classList.add("active");
  overlay.classList.add("active");
}

function cerrarCarrito() {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
}

function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      nombre: nombre,
      precio: precio,
      cantidad: 1
    });
  }

  actualizarCarrito();
  abrirCarrito();
}

function eliminarProducto(nombre) {
  const index = carrito.findIndex(item => item.nombre === nombre);

  if (index !== -1) {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
}

function aumentarCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  }

  actualizarCarrito();
}

function disminuirCantidad(nombre) {
  const producto = carrito.find(item => item.nombre === nombre);

  if (producto) {
    producto.cantidad--;

    if (producto.cantidad <= 0) {
      eliminarProducto(nombre);
      return;
    }
  }

  actualizarCarrito();
}

function vaciarCarrito() {
  carrito.length = 0;
  actualizarCarrito();
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let resumen = "Resumen de compra:\n\n";

  carrito.forEach(item => {
    resumen += `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CO")}\n`;
  });

  resumen += `\nTotal: ${calcularTotal().toLocaleString("es-CO")}`;

  alert(resumen);
  vaciarCarrito();
}

function calcularTotal() {
  return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

function actualizarCarrito() {
  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Tu carrito está vacío.</p>`;
  } else {
    carrito.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <h4>${item.nombre}</h4>
        <p>Precio: $${item.precio.toLocaleString("es-CO")}</p>
        <p>Cantidad: ${item.cantidad}</p>
        <p>Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CO")}</p>
        <div class="cart-item-actions">
          <button class="btn-add" onclick="aumentarCantidad('${item.nombre}')">+</button>
          <button class="btn-remove" onclick="disminuirCantidad('${item.nombre}')">-</button>
          <button class="btn-remove" onclick="eliminarProducto('${item.nombre}')">Eliminar</button>
        </div>
      `;

      cartItems.appendChild(div);
    });
  }

  cartTotal.textContent = `$${calcularTotal().toLocaleString("es-CO")}`;

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  cartCount.textContent = totalItems;
}
