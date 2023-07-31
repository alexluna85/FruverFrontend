import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CompraModel } from '../shared/Models/Compra.model';
import { ProductoCompraModel } from '../shared/Models/ProductoCompra.model';
import { CompraService } from '../shared/Services/compra.service';
import { ProductoCompraService } from '../shared/Services/producto-compra.service';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  compra: CompraModel | undefined;
  productosCompra: Observable<ProductoCompraModel[]> | undefined;
  idCompra = 0;
  total = 0;
  fecha: Date | undefined;
  valorTotal=0;
  constructor(private route: ActivatedRoute, private compraService: CompraService, private productoCompraService: ProductoCompraService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idCompra = params['idCompra'];
      console.log('idCompra recibido:', this.idCompra);
    });


    this.compraService.obtenerCompraId(this.idCompra).subscribe(compraObtenida => {
      this.compra = compraObtenida[0];
      console.log(this.compra);
      this.fecha = this.compra.fecha;
      this.valorTotal=this.compra.valorTotal;
      console.log(this.fecha);
      this.productosCompra = this.productoCompraService.obtenerProductoCompraId(this.idCompra);
      this.productosCompra.subscribe(productosCompra => {
        this.total = productosCompra.length;
      });
    });

  }
}
