import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../shared/Models/Usuario.model';
import { AuthService } from '../shared/Services/auth.service';
import { UsuarioService } from '../shared/Services/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  mensaje = '';
  mensajeSesionExitosa = '';
  returnUrl: string = ''; // Variable para almacenar la URL actual antes de redirigir al inicio de sesión

  usuario = new UsuarioModel(0, "", "", "", "", "cliente");

  mensajeEmail = '';
  constructor(private usuarioService: UsuarioService, private router: Router, private authService: AuthService) { }


  registro() {
    console.log(this.usuario);
    this.mensajeEmail = '';
    this.usuarioService.obtenerUsuarioEmail(this.usuario.email).subscribe((usuario) => {
      if (usuario) {//si existe este correo mostramos el mensaje
        this.mensajeEmail = 'El correo ingresado ya existe, debe elegir otro';
      } else {
        this.usuarioService.agregarUsuario(this.usuario).subscribe((usuario) => {
          const usuarioCreado = usuario;
          localStorage.setItem('idUsuario', usuarioCreado.idUsuario.toString());
            console.log('Inicio de sesión exitoso');
            this.mensajeSesionExitosa = 'Inicio de sesión exitoso';
            this.router.navigate(['/inicio']);
        });
      }
    },
    (error) => {
      console.log('Error al crear el usuario:', error);
      this.mensaje = 'Error al crear el usuario:';
    });

  }


  login() {
    console.log("Email:" + this.email);
    console.log("Pass:" + this.password);
    this.mensajeSesionExitosa = '';
    this.mensaje = '';

    // Llamamos al servicio para obtener el usuario por email
    this.usuarioService.obtenerUsuarioEmail(this.email).subscribe(
      (usuario) => {
        // Verificamos si se encontró un usuario con ese email
        console.log(usuario);
        if (usuario) {
          const usuarioEncontrado = usuario;
          // Verificamos si la contraseña coincide
          if (usuarioEncontrado.password == this.password) {
            // Inicio de sesión exitoso
            // Guardamos el id del usuario en localStorage para mantener la sesión
            localStorage.setItem('idUsuario', usuarioEncontrado.idUsuario.toString());
            console.log('Inicio de sesión exitoso');
            this.mensajeSesionExitosa = 'Inicio de sesión exitoso';

            //Verificar si es admin o cliente
            if (usuarioEncontrado.rol == 'admin') {
              this.router.navigate(['/productos']);
            } else {
              const tipo='Todos';
              this.router.navigate(['/inicio'],{queryParams:{tipo}});
            }

          } else {
            console.log('Contraseña incorrecta');
            this.mensaje = "Contraseña incorrecta";
          }
        } else {
          console.log('Usuario no encontrado');
          this.mensaje = 'Usuario no encontrado';
        }
      },
      (error) => {
        console.log('Error al obtener el usuario:', error);
        this.mensaje = 'Error al obtener el usuario:';
      }
    );
  }

}
