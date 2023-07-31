import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoModel } from '../shared/Models/Producto.model';
import { ProductoService } from '../shared/Services/producto.service';

@Component({
  selector: 'app-editar-productos',
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css']
})
export class EditarProductosComponent {
  producto = new ProductoModel(0, "", 0, "", "", "");

  constructor(private productoService: ProductoService, private router: Router) { }

  agregarProducto() {
    console.log(this.producto);
    this.productoService.agregarProducto(this.producto).subscribe(data => {
      console.log(data);
      alert("See agregó el producto:" + this.producto.idProducto);
      this.router.navigate(['/productos']);
    });
  }
}
