import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // Variable para almacenar la URL a la que redirigir después de iniciar sesión
 private returnUrl: string = '';

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    // Aquí implementa la lógica para verificar si el usuario ha iniciado sesión
    // Devuelve true si está logueado o false en caso contrario
    // Por ejemplo, si tienes el id del usuario en el LocalStorage, podrías verificar si está presente y si es válido para considerar que el usuario ha iniciado sesión
    return localStorage.getItem('idUsuario') !== null;
    // return false; // Este es solo un ejemplo. Implementa la lógica real en tu aplicación.
  }

  // Método para almacenar la URL actual en la variable returnUrl
  setReturnUrl(url: string) {
    this.returnUrl = url;
    console.log(this.returnUrl);
  }

  // Método para redirigir a la URL almacenada en returnUrl
  redirectToPreviousUrl() {
    console.log(this.returnUrl);
    this.router.navigate([this.returnUrl]);
    this.returnUrl = ''; // Limpiar la URL almacenada después de redirigir
  }

  redirectToLogin(returnUrl: string): void {
    // Almacena la URL actual antes de redirigir al formulario de inicio de sesión
    localStorage.setItem('returnUrl', returnUrl);
    this.router.navigate(['/login']);
  }

  getReturnUrl(): string | null {
    // Obtiene la URL almacenada antes de redirigir al formulario de inicio de sesión
    return localStorage.getItem('returnUrl');
  }

  clearReturnUrl(): void {
    // Limpia la URL almacenada después de redirigir al formulario de inicio de sesión
    localStorage.removeItem('returnUrl');
  }

}
