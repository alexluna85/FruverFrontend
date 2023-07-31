import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoCompraModel } from '../Models/ProductoCompra.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoCompraService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerProductoCompraId(idCompra: number){
    return this.http.get<ProductoCompraModel[]>(`${this.BASE_URL}/productos_comprados/${idCompra}`);
  }
  agregarProductoCompra(productoCompra:ProductoCompraModel){
    return this.http.post<ProductoCompraModel>(`${this.BASE_URL}/producto_compra`,productoCompra);
  }
}