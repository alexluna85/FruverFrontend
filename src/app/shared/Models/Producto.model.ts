export class ProductoModel {
    constructor(
        public idProducto: number,
        public nombre: string,
        public precio: number,
        public detalle: string,
        public tipo: string,
        public imagen: string
    ) {
    }
}

