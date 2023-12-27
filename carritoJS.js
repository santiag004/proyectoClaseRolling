const database = window.localStorage
const formAgregarProductos = document.getElementById("formAgregarProducto")
const inputAgregarProductosNombre = document.getElementById("inputNombreProducto")
const inputAgregarProductosNumero = document.getElementById("inputPrecioProducto")
const inputAgregarProductoDetalles = document.getElementById("inputDescripcionProducto")
const btnAddProducto = document.getElementById("buttonAgregarProducto")
const codigoSku = document.getElementById("inputCodigoSku")
const lista = document.getElementById("listaProductos")

class Producto {
    constructor(id, nombre, precio, descripcion) {
        this._id = id;
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
    }
//getters
    get getId() {
        return this._id;
    }

    get getNombre() {
        return this._nombre;
    }

    get getPrecio() {
        return this._precio;
    }

    get getDescripcion() {
        return this._descripcion;
    }
//setters
    set setId(id) {
        this._id = id;
    }
    set setNombre(nombre) {
        this._nombre = (nombre);
    }
    set setPrecio(precio) {
        this._precio = precio
    }

    set setDescripcion(descripcion) {
        this._descripcion = descripcion;
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
    db.setItem(productoAGuardar._id, JSON.stringify(productoAGuardar))
}
const crearProducto = (idP, nomP, preP, detP) => {
    return new Producto(idP, nomP, preP, detP)
}

const listarProductos = () => {
    lista.innerHTML = ""
    let idsProductos = Object.keys(database)
    for (_id of idsProductos) {
        let producto = JSON.parse(database.getItem(_id))
        const li = document.createElement("li")
        li.textContent = `nombre: ${producto._nombre} - detalle: ${producto._descripcion} - precio: ${producto._precio}`
        lista.appendChild(li)
        const botonEliminarProducto = document.createElement("button")
        const btnEditar= document.createElement("button")
        botonEliminarProducto.textContent = "Borrar del Carrito"
        btnEditar.textContent="Editar producto"
        li.appendChild(btnEditar)
        li.appendChild(botonEliminarProducto)
        botonEliminarProducto.addEventListener("click", () => { 
            eliminarProductos(database, producto)
            listarProductos()
        })
        btnEditar.addEventListener("click",()=>{
            const formEditar=document.getElementById("formEditar")
            const inputEditarNombre=document.createElement ("input")
            const inputEditardetalle=document.createElement ("input")
            const inputEditarPrecio=document.createElement ("input")
            const btnGuardarCambios=document.createElement("button")
            inputEditarNombre.value =producto._nombre
            inputEditardetalle.value =producto._descripcion
            inputEditarPrecio.value =producto._precio
            btnGuardarCambios.textContent="Guardar Cambios"
            formEditar.appendChild(inputEditarNombre)
            formEditar.appendChild(inputEditardetalle)
            formEditar.appendChild(inputEditarPrecio)
            formEditar.appendChild(btnGuardarCambios)
            btnGuardarCambios.addEventListener("click",()=>{
                let nuevoNombre=inputEditarNombre.value.toLowerCase()
                let nuevoDescripcion=inputEditardetalle.value.toLowerCase()
                let nuevoPrecio= Number (inputEditarPrecio.value)
                producto._nombre=nuevoNombre
                producto._descripcion=nuevoDescripcion
                producto._precio=nuevoPrecio
                guardarProductoDB(database,producto)
                listarProductos()
            })
        })
    }
}
listarProductos()
const eliminarProductos = (database, productos) => {
database.removeItem(productos._id) //removeIteam es del localStorage para que se elimine el id del producto.
}