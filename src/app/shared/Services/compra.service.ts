import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CompraModel } from '../Models/Compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerCompraId(idCompra: number){
    return this.http.get<CompraModel[]>(`${this.BASE_URL}/compra/${idCompra}`);
  }
  obtenerComprasUsuario(idUsuario:number){
    return this.http.get<CompraModel[]>(`${this.BASE_URL}/compras_usuario/${idUsuario}`);
  }
  agregarCompra(compra:CompraModel){
    return this.http.post<CompraModel>(`${this.BASE_URL}/compra`,compra);
  }
}
