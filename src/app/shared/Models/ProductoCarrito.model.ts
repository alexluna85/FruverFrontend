import { ProductoModel } from "./Producto.model";

export class ProductoCarritoModel {
    constructor(
        public idProductoCarrito:number,
        public idUsuario: number,
        public idProducto: number,
        public cantidad: number,
        public valorProductoCarrito: number,
        public Producto:ProductoModel

    )
    {
        this.valorProductoCarrito=this.calcularSubtotal();
    }

    private calcularSubtotal(): number {
        return this.Producto.precio * this.cantidad;
    }
}

