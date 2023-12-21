const buttonEliminar = document.createElement("button")
buttonEliminar.textContent = "Eliminar Producto"
buttonEliminar.addEventListener("click", () => {
    //falta llamar a la funcion y agregarle a ulProducto el removechild(li)
})

function eliminarProdcuto (ulProductos , productoAeliminar) {
const eliminar = ulProductos.indexOF(productoAeliminar)
 if (eliminar !== -1) {
    ulProductos.splice(eliminar , 1)
}
}
//al li hay que agregarle el appenchild (buttonEliminar)
//ulProductos agregarle el appenchild (li)
//localStorage?????? removeIteam pero que parametro paso? lista? 