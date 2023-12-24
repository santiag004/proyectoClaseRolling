const database = window.localStorage
const formAgregarProductos = document.getElementById("formAgregarProducto")
const inputAgregarProductosNombre = document.getElementById("inputNombreProducto") 
const inputAgregarProductosNumero = document.getElementById("inputPrecioProducto")
const inputAgregarProductoDetalles = document.getElementById("inputDescripcionProducto")
const btnAddProducto = document.getElementById("buttonAgregarProducto") 

let Productos = {}

const guardarProductoDB = (db, productoAGuardar) => {
    db.setItem(productoAGuardar.id, JSON.stringify(productoAGuardar))
}

btnAddProducto.addEventListener("click", (event) => {
    event.preventDefault();
    const nombreProducto = inputAgregarProductosNombre.value.toLowerCase()
    const precioProducto = parseInt(inputAgregarProductosNumero.value)
    const detallesProducto = inputAgregarProductoDetalles.value.toLowerCase()
    let productosEnDB = Object.keys(database)
    if (productosEnDB.length === 10 ) {
        return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "SE ALCANZÓ EL LIMITE DE PRODUCTOS DEL CARRITO (10 productos)",
            footer: 'Probá borrando productos'
          });
    }

    for (let id of productosEnDB) {
        let producto = JSON.parse(database.getItem(id))
        if (nombreProducto === producto.nombre) {
            return Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "NO SE PUEDEN AGREGAR PRODUCTOS CON EL MISMO NOMBRE",
                footer: 'Probá con otro nombre'
              });
        }
    }

    if (inputAgregarProductosNombre.value === "" || inputAgregarProductosNumero.value === "" || inputAgregarProductoDetalles.value === "") {
        return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "NO SE PUEDE AGREGAR UN PRODUCTO CON ALGUNO DE SUS DATOS VACIOS",
          });
    } else {
        Productos = {
            nombre: nombreProducto,
            precio: precioProducto,
            detalles: detallesProducto,
            id: Math.floor(Math.random() * 100)
        }
        guardarProductoDB(database, Productos)
    }
    console.log(Productos)
    formAgregarProductos.reset()
})

