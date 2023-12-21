const botonEliminarProducto = document.createElement("button")
botonEliminarProducto.textContent = "Borrar Producto"
li.appendChild(botonEliminarProducto) //se agrega el boton eliminar a cada li.
botonEliminarProducto.addEventListener ("click", () => {
    eliminarProductos(database, productos)
    listarProductos()
    huecosLibres()
    carritoLlena()
})
const eliminarProductos = (database, productos) => {
database.removeItem(productos.id) //removeIteam es del localStorage para que se elimine el id del producto.
}