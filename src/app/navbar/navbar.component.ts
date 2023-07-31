import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoCarritoModel } from '../shared/Models/ProductoCarrito.model';
import { UsuarioModel } from '../shared/Models/Usuario.model';
import { ProductoCarritoService } from '../shared/Services/producto-carrito.service';
import { UsuarioService } from '../shared/Services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  productos: Observable<ProductoCarritoModel[]> | undefined;
  usuario: Observable<UsuarioModel> | undefined;
  total = 0;
  rol = '';
  nombre = '';
  login = false;
  constructor(private productosCarritoService: ProductoCarritoService, private usuarioService: UsuarioService, private router: Router) { }


  ngOnInit() {
    const id = localStorage.getItem('idUsuario');
    if (id) {
      this.login = true;
      const idUsuario = parseInt(id);
      this.usuario = this.usuarioService.obtenerUsuarioId(idUsuario);
      this.usuario.subscribe(user => {
        this.rol = user.rol;
        this.nombre = user.email;
      });
      this.productos = this.productosCarritoService.obtenerCarrito(idUsuario);
      this.productos.subscribe(carrito => {
        this.total = carrito.length;
      });
      this.productosCarritoService.productoAgregado.subscribe(data => {
        if(this.productos)
        this.productos.subscribe(carrito => {
          this.total = carrito.length;
        });
      });

    } else {
      this.login = false;
    }
  }

  sesion() {
    const id = localStorage.getItem('idUsuario');
    if (id) {
      const tipo='Todos';
      localStorage.removeItem('idUsuario');
      this.ngOnInit();
      this.router.navigate(['/inicio'],{queryParams:{tipo}});

    } else {
      this.router.navigate(['/login']);

    }
  }

  mostrarCategoria(tipo: string){
    // localStorage.setItem('tipo',tipo);
    // this.router.navigate(['/carrito']);
    // this.router.navigateByUrl(`/inicio`);
    console.log(tipo);
    this.router.navigate(['/inicio'], { queryParams: { tipo } });
  }
}
