import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ComprarComponent } from './comprar/comprar.component';
import { ProductosComponent } from './productos/productos.component';
import { EditarProductosComponent } from './editar-productos/editar-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Define tus rutas aquí
  {path:'inicio/:tipo', component:InicioComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    NavbarComponent,
    CarritoComponent,
    ComprarComponent,
    ProductosComponent,
    EditarProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
