const productos = [];
const formAgregar = document.getElementById("formAgregarProducto")
const nombreProducto = document.getElementById("inputNombreProducto")
const descripcionProducto = document.getElementById("inputDescripcionProducto")
const precioProducto = document.getElementById("inputPrecioProducto")
const btnAdd = document.getElementById("buttonAgregarProducto")



class Producto {
  constructor(nombre, detalle, precio) {
    this._nombre = nombre;
    this._detalle = detalle;
    this._precio = precio;
  }
  get getNombre() {
    return this._name;
  }
  set setNombre(nombre) {
    this._nombre = nombre;
  }

  get getDetalle() {
    return this._detalle;
  }
  set setDetalle(detalle) {
    this._detalle = detalle;
  }
  get getPrecio() {
    return this._precio;
  }
  set setPrecio(precio) {
    this._precio = precio;
  }
}

btnAdd.addEventListener("click", (event) => {
  event.preventDefault()
  if (nombreProducto.value==="" && descripcionProducto.value === "" && precioProducto.value==="") {
    alert("NO puede agregar un producto vacio")
  } else {
    let nombre = nombreProducto.value.toLowerCase().trim();
    let descripcio = descripcionProducto.value.toLowerCase().trim()
    let precio = precioProducto.value
    productos.push(new Producto(nombre, descripcio, precio));
    localStorage.setItem("misProductos",JSON.stringify(productos))
  }
  console.log(productos)
  formAgregarProducto.reset();
});

