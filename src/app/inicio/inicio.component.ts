import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/Models/Producto.model';
import { ProductoCarritoModel } from '../shared/Models/ProductoCarrito.model';
import { AuthService } from '../shared/Services/auth.service';
import { ProductoCarritoService } from '../shared/Services/producto-carrito.service';
import { ProductoService } from '../shared/Services/producto.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  tipo = '';
  prod = new ProductoModel(0, "", 0, "", "", "");
  cantidades: { [idProducto: number]: number } = {}; // Variable temporal para almacenar las cantidades
  textoBuscar = '';
  productoCarrito = new ProductoCarritoModel(0, 0, 0, 0, 0, this.prod);
  productos: Observable<ProductoModel[]> | undefined;

  constructor(private productoService: ProductoService, private productoCarritoService: ProductoCarritoService, private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.textoBuscar != '') {
      console.log(this.textoBuscar);
      this.productos = this.productoService.obtenerProductosNombre(this.textoBuscar);
    } else {
      this.textoBuscar='';
      this.route.queryParams.subscribe(params => {
        const cat = params['tipo'];
        console.log("Categoria:",cat);
        if(!cat){
          this.productos = this.productoService.obtenerProductos();
        }
        else if (cat=='Todos') {
          this.tipo = cat;

          this.productos = this.productoService.obtenerProductos();
          }
        else {
          this.tipo = cat;
          console.log('Tipo', this.tipo);

          this.productos = this.productoService.obtenerProductosTipo(this.tipo);
        
        }
      });
    }
  }

  agregarProducto(producto: ProductoModel) {
    console.log(producto);
    const cantidad = this.cantidades[producto.idProducto];
    //Hay que sacar el id del usuario en sesion desde la base de datos o tener el sesion su id
    const id = localStorage.getItem('idUsuario');
    if (id) {
      this.productoCarrito.idUsuario = parseInt(id);
      this.productoCarrito.cantidad = cantidad;
      this.productoCarrito.Producto = producto;
      this.productoCarrito.idProducto = producto.idProducto;
      this.productoCarrito.valorProductoCarrito = producto.precio * this.productoCarrito.cantidad;

      console.log(this.productoCarrito);

      this.productoCarritoService.agregarProductoAlCarrito(this.productoCarrito).subscribe(prod => {
        console.log(prod);
        if (prod) {
          alert("Se agregó el producto al carrito");
          this.ngOnInit();
        }
      });
    } else {
      const currentUrl = this.router.url;
      console.log(currentUrl);
      this.authService.setReturnUrl(currentUrl);
      this.router.navigate(['/login']);
    }
  }


  buscar() {
    // this.textoBuscar='';
    this.ngOnInit();

  }

}
