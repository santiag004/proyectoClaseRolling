const buttonEliminar = document.createElement("button")
buttonEliminar.textContent = "Eliminar"
buttonEliminar.addEventListener("click", () => {
})

function productoAeliminar (ulProductos , productoAeliminar) {
const eliminar = ulProductos.indexOF(productoAeliminar)
 if (eliminar !== -1) {
    ulProductos.splice(eliminar , 1)
}
}