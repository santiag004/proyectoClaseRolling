const mensajeEliminadoProducto = document.getElementById("mensajeEliminado")
const buttonEliminar = document.createElement("button")
buttonEliminar.textContent = "Eliminar Producto"
buttonEliminar.addEventListener("click", () => {
    //falta llamar a la funcion y agregarle a ulProducto el removechild(li)
})

function eliminarProdcuto (ulProductos , productoAeliminar) {
const eliminar = ulProductos.indexOF(productoAeliminar)
let confirmar = confirm("Deseas eliminar el producto?")//sale como un alert para aceptar o cancelar
 if (confirmar) {
    ulProductos.splice(eliminar , 1)
    mensajeEliminadoProducto.textContent = `El producto fue eliminado`
}
}
//al li hay que agregarle el appenchild (buttonEliminar)
//ulProductos agregarle el appenchild (li)
//localStorage?????? removeIteam pero que parametro paso? lista? 