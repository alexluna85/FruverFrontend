import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../Models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerUsuarioId(idUsuario: number){
    return this.http.get<UsuarioModel>(`${this.BASE_URL}/usuario/${idUsuario}`);
  }
  obtenerUsuarioEmail(email:string){
    return this.http.get<UsuarioModel>(`${this.BASE_URL}/usuario_email/${email}`);
  }
  agregarUsuario(usuario:UsuarioModel){
    return this.http.post<UsuarioModel>(`${this.BASE_URL}/usuario`,usuario);
  }
}
