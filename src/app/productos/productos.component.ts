import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/Models/Producto.model';
import { ProductoService } from '../shared/Services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  total = 0;
  productos: Observable<ProductoModel[]> | undefined;

  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit() {
    this.productos = this.productoService.obtenerProductos();
    this.productos.subscribe(productos => {
      this.total = productos.length;
    });
  }

  guardarProducto(producto: ProductoModel) {
    console.log(producto);
    this.productoService.actualizarProducto(producto).subscribe(data => {
      console.log(data);
      alert(`Se actualizó el producto ${data.idProducto}:${data.nombre}`);
      this.ngOnInit();
      // this.router.navigate(['/productos']);
      //Aqui mejor redireccionar a buscar el id del producto, agregar funcion
    });
  }
  
  borrarProducto(idProducto: number) {
    console.log(idProducto);
    this.productoService.borrarProducto(idProducto).subscribe(data => {
      alert(`Se eliminó correctamente el producto ${idProducto}: ${data.nombre}`)
      console.log("Registro eliminado correctamente");
      this.ngOnInit();
    });
  }
}
