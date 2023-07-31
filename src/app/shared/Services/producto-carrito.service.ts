import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ProductoModel } from '../Models/Producto.model';
import { ProductoCarritoModel } from '../Models/ProductoCarrito.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoCarritoService {
  productoAgregado: EventEmitter<void> = new EventEmitter<void>();
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerCarrito(idUsuario: number){
    return this.http.get<ProductoCarritoModel[]>(`${this.BASE_URL}/productos_carrito/${idUsuario}`);
  }
  agregarProductoAlCarrito(productoCarrito: ProductoCarritoModel) {
    this.productoAgregado.emit();
    return this.http.post<ProductoCarritoModel>(`${this.BASE_URL}/producto_carrito`, productoCarrito);
  }
  actualizarProductoCarrito(productoCarrito: ProductoCarritoModel){
    return this.http.put<ProductoCarritoModel>(`${this.BASE_URL}/producto_carrito/${productoCarrito.idProductoCarrito}`,productoCarrito);
  }
  quitarProductoDelCarrito(idProductoCarrito: number){
    this.productoAgregado.emit();
    return this.http.delete<ProductoCarritoModel>(`${this.BASE_URL}/producto_carrito/${idProductoCarrito}`);
  }
  vaciarCarrito(idUsuario: number){
    this.productoAgregado.emit();
    return this.http.delete<string>(`${this.BASE_URL}/carrito/${idUsuario}`);
  }

  obtenerProductoCarrito(idProductoCarrito:number){
    return this.http.get<ProductoCarritoModel>(`${this.BASE_URL}/producto_carrito/${idProductoCarrito}`);
  }

  // Método para calcular el total de la compra
  // calcularTotalCompra(): number {
  //   return this.productosEnCarrito.reduce((total, productoCarrito) => total + productoCarrito.precio, 0);
  // }


}
