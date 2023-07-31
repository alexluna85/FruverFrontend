import { ProductoModel } from "./Producto.model";

export class ProductoCompraModel {
    constructor(
        public idProductoCompra: number,
        public idCompra: number,
        public idProducto: number,
        public cantidad: number,
        public valorProductoCompra: number,
        public Producto: ProductoModel
    ) {
    }
}

