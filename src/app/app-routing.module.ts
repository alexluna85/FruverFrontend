import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { ComprarComponent } from './comprar/comprar.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'login', component:LoginComponent},
  {path:'carrito', component:CarritoComponent},
  {path:'comprar/:idCompra', component:ComprarComponent},
  {path:'productos', component:ProductosComponent},
  {path:'agregar', component:EditarProductosComponent},
  {path:'inicio/:tipo', component:InicioComponent},
  {path:'**', redirectTo:'inicio', pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
