import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CompraModel } from '../shared/Models/Compra.model';
import { ProductoModel } from '../shared/Models/Producto.model';
import { ProductoCarritoModel } from '../shared/Models/ProductoCarrito.model';
import { ProductoCompraModel } from '../shared/Models/ProductoCompra.model';
import { UsuarioModel } from '../shared/Models/Usuario.model';
import { CompraService } from '../shared/Services/compra.service';
import { ProductoCarritoService } from '../shared/Services/producto-carrito.service';
import { ProductoCompraService } from '../shared/Services/producto-compra.service';
import { UsuarioService } from '../shared/Services/usuario.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productos: Observable<ProductoCarritoModel[]> | undefined;
  productosCarrito: ProductoCarritoModel[] = [];
  valorTotal = 0;

  idCompra = 0;
  constructor(private productoCarritoService: ProductoCarritoService, private usuarioService: UsuarioService, private compraService: CompraService, private productoCompraService: ProductoCompraService, private router: Router) { }

  ngOnInit() {
    const id = localStorage.getItem('idUsuario');
    ///Buscar el id del usuario que esta en sesion, sino no mostrará productos
    if (id) {
      const idUsuario = parseInt(id);
      console.log("Id",idUsuario);
      this.productos = this.productoCarritoService.obtenerCarrito(idUsuario);
      this.productos.subscribe((data) => {
        this.productosCarrito = data;
        console.log(this.productosCarrito);
        this.valorTotal = data.reduce((total, productoCarrito) => {
          return total + Number(productoCarrito.valorProductoCarrito);
        }, 0);
        console.log('Valor Total:', this.valorTotal);
      });
    }
  }
  actualizar(producto: ProductoCarritoModel) {
    producto.valorProductoCarrito = producto.Producto.precio * producto.cantidad;
    console.log(producto.valorProductoCarrito);
    this.productoCarritoService.actualizarProductoCarrito(producto).subscribe(data => {
      console.log("Actual");
      console.log(data);
      this.ngOnInit();
    },
      (error) => {
        console.log('Error al actualizar el carrito:', error);
      });
  }
  eliminar(producto: ProductoCarritoModel) {
    this.productoCarritoService.quitarProductoDelCarrito(producto.idProductoCarrito).subscribe(data => {
      this.ngOnInit();
    },
      (error) => {
        console.log('Error al eliminar el producto:', error);
      });
  }

  vaciarCarrito() {
    const id = localStorage.getItem('idUsuario');
    if (id) {
      const idUsuario = parseInt(id);
      this.productoCarritoService.vaciarCarrito(idUsuario).subscribe(data => {
        this.ngOnInit();
      },
        (error) => {
          console.log('Error al eliminar el producto:', error);
        });
    }
  }



  finalizarCompra() {
    const id = localStorage.getItem('idUsuario');
    if (id) {
      const idUsuario = parseInt(id);
      console.log("id Us carrito",idUsuario);
      this.usuarioService.obtenerUsuarioId(idUsuario).subscribe(usuario => {
        let user = new UsuarioModel(usuario.idUsuario, usuario.email, usuario.password, usuario.nombres, usuario.direccion, 'cliente');
        console.log(user);
        let fechaActual = new Date();
        let compra = new CompraModel(0, idUsuario, this.valorTotal, fechaActual, user);
        console.log(compra);



        // Llamamos al servicio para registrar la compra y los productos del carrito en el backend
        this.compraService.agregarCompra(compra).subscribe(
          (compraRegistrada) => {
            this.idCompra = compraRegistrada.idCompra;
            // Si la compra se registró correctamente, procedemos a registrar cada ProductoCompra
            for (let productoCarrito of this.productosCarrito) {
              const productoCompra: ProductoCompraModel = {
                idProductoCompra: 0, // dejar este campo en 0 porque el backend se encarga de generar el id
                idCompra: compraRegistrada.idCompra, // Asignamos el id de la compra recién registrada
                idProducto: productoCarrito.idProducto, // Obtenemos el id del producto del carrito
                cantidad: productoCarrito.cantidad, // Obtenemos la cantidad del producto del carrito
                valorProductoCompra: productoCarrito.valorProductoCarrito, // Obtenemos el valor del producto del carrito
                Producto: productoCarrito.Producto // Asignamos el objeto de ProductoCarrito al campo Producto del ProductoCompra
              };

              // Llamamos al servicio para agregar cada ProductoCompra
              this.productoCompraService.agregarProductoCompra(productoCompra).subscribe(
                (productoCompraRegistrado) => {
                  console.log('ProductoCompra registrado:', productoCompraRegistrado);
                  // Aquí puedes realizar alguna acción si lo deseas, por ejemplo, mostrar un mensaje de éxito
                  this.productoCarritoService.vaciarCarrito(idUsuario).subscribe(data=>{
                    console.log(data);
                  });
                },
                (error) => {
                  console.error('Error al registrar el ProductoCompra:', error);
                }
              );
            }

            console.log('Compra registrada exitosamente');
          },
          (error) => {
            console.error('Error al registrar la compra:', error);
          }
        );

      });
    }
    // 
    //     
  }


  mostrarCompra() {
    // Navegamos a la ruta /comprar con el idCompra como parámetro de consulta
    console.log(this.idCompra);
    this.router.navigateByUrl(`/comprar/${this.idCompra}`);

  }

}
