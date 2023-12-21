const botonEliminarProducto = document.createElement("button")
botonEliminarProducto.textContent = "Borrar Producto"
li.appendChild(botonEliminarProducto)
botonEliminarProducto.addEventListener ("click", () => {
    eliminarProductos(database, productos)
    listarProductos()
    huecosLibres()
    carritoLlena()
})
const eliminarProductos = (database, productos) => {
database.removeItem(productos.id)
}