const productos = [];

class Producto {
  constructor(nombre,detalle,precio) {
    this._nombre = nombre;
    this._datelle = detalle;
    this._precio=precio;
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
