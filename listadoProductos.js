const database = window.localStorage
const ulProductos = document.getElementById("listaProductos")

let productosPrueba = {
    nombre: "Campera",
    descripcion: "Campera abrigada para bajas temperaturas",
    precio: "$4000",
}

const listarProductos = () => {
    ulProductos.innerHTML = ""
    let idProductos = Object.keys(database)
    for (id of idProductos) {
        let productos = JSON.parse(database.getItem(id))
        const li = document.createElement("li")
        li.textContent = `NOMBRE: ${productos.nombre} -DESCRIPCIÓN: ${productos.detalle} - PRECIO: ${productos.precio}`
        ulProductos.appendChild(li)
        const botonEliminarProductos = document.createElement("button")
        botonEliminarProductos.textContent = "Borrar del carrito"
        li.appendChild(botonEliminarProductos)
        botonEliminarProductos.addEventListener ("click", () => {
            eliminarProducto(database, productos)
            listarProductos()
            espacioLibre()
            carritoLleno()
        })
    }
}
listarProductos()