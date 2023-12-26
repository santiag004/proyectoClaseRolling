const database = window.localStorage
const formAgregarProductos = document.getElementById("formAgregarProducto")
const inputAgregarProductosNombre = document.getElementById("inputNombreProducto")
const inputAgregarProductosNumero = document.getElementById("inputPrecioProducto")
const inputAgregarProductoDetalles = document.getElementById("inputDescripcionProducto")
const btnAddProducto = document.getElementById("buttonAgregarProducto")
const codigoSku = document.getElementById("inputCodigoSku")
const lista = document.getElementById("listaDeProductos")

class Producto {
    constructor(id, nombre, precio, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }

    getId() {
        return this.id;
    }

    getNombre() {
        return this.nombre;
    }

    getPrecio() {
        return this.precio;
    }

    getDescripcion() {
        return this.descripcion;
    }

    setId(id) {
        this.id = id;
    }
    setNombre(nombre) {
        this.nombre = (nombre);
    }
    setPrecio(precio) {
        this.precio = precio
    }

    setDescripcion(newDescripcion) {
        this.descripcion = newDescripcion;
    }
}


btnAddProducto.addEventListener("click", (event) => {
    event.preventDefault();
    const nombreProducto = inputAgregarProductosNombre.value.toLowerCase()
    const precioProducto = parseInt(inputAgregarProductosNumero.value)
    const detallesProducto = inputAgregarProductoDetalles.value.toLowerCase()
    const sku = codigoSku.value
    let productosEnDB = Object.keys(database)
    if (productosEnDB.length === 10) {
        return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "SE ALCANZÓ EL LIMITE DE PRODUCTOS DEL CARRITO (10 productos)",
            footer: 'Probá borrando productos'
        });
    }

    for (let id of productosEnDB) {
        let producto = JSON.parse(database.getItem(id))
        if (codigoSku.value === producto._id) {
            return Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "NO SE PUEDEN AGREGAR PRODUCTOS CON EL MISMO CODIGO SKU",
                footer: 'Probá con otro SKU'
            });
        }
    }

    if (inputAgregarProductosNombre.value === "" || inputAgregarProductosNumero.value === "" || inputAgregarProductoDetalles.value === "" || codigoSku.value === "") {
        return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "NO SE PUEDE AGREGAR UN PRODUCTO CON ALGUNO DE SUS DATOS VACIOS",
        });
    } else {
        const productos = crearProducto(sku, nombreProducto, precioProducto, detallesProducto)
        guardarProductoDB(database, productos)
        listarProductos()
    }
    formAgregarProductos.reset()
})

const guardarProductoDB = (db, productoAGuardar) => {
    db.setItem(productoAGuardar.id, JSON.stringify(productoAGuardar))
}
const crearProducto = (idP, nomP, preP, detP) => {
    return new Producto(idP, nomP, preP, detP)
}

const listarProductos = () => {
    lista.innerHTML = ""
    let idsProductos = Object.keys(database)
    for (id of idsProductos) {
        let producto = JSON.parse(database.getItem(id))
        console.log(producto)
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${producto.nombre} - DETALLES: ${producto.descripcion} - PRECIO: ${producto.precio}`
        lista.appendChild(li)
        const botonEliminarContacto = document.createElement("button")
        botonEliminarContacto.textContent = "Borrar del Carrito"
        li.appendChild(botonEliminarContacto)
        botonEliminarContacto.addEventListener("click", () => {
            eliminarContacto(database, contacto)
            listarContactos()
            huecosLibres()
            agendaLlena()
        })
    }
}
listarProductos()

