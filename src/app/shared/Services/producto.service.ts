import { Injectable } from '@angular/core';
import { ProductoModel } from '../Models/Producto.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {  }

  obtenerProductos(){
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }
  obtenerProductosNombre(nombre:string){
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos/nombre/${nombre}`);
  }
  obtenerProductoId(idProducto:number){
    return this.http.get<ProductoModel>(`${this.BASE_URL}/productos/${idProducto}`);
  }
  agregarProducto(producto:ProductoModel){
    return this.http.post<ProductoModel>(`${this.BASE_URL}/productos`,producto);
  }
  actualizarProducto(producto: ProductoModel) { 
    return this.http.put<ProductoModel>(`${this.BASE_URL}/productos/${producto.idProducto}`,producto);
  }
  borrarProducto(idProducto: number) { 
    return this.http.delete<ProductoModel>(`${this.BASE_URL}/productos/${idProducto}`);
  }

  obtenerProductosTipo(tipo:string){
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos_tipo/${tipo}`);
  }
}
