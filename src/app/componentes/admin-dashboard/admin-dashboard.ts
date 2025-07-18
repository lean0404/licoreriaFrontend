import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosAdminComponent } from '../productos-admin/productos-admin';
import { UsuariosAdminComponent } from '../usuarios-admin/usuarios-admin';
import { VendedoresAdminComponent } from '../vendedores-admin/vendedores-admin';
import { AdminTiposProductos } from '../admin-tiposproductos/admin-tiposproductos';
import { AdminMarcasComponent } from '../admin-marcas/admin-marcas';
import { ReportesAdminComponent } from '../reportes-admin/reportes-admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProductosAdminComponent,
    UsuariosAdminComponent,
    VendedoresAdminComponent,
    AdminTiposProductos,
    AdminMarcasComponent,
    ReportesAdminComponent
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  username = localStorage.getItem('username') || 'Admin';

  mostrarProductos = false;
  mostrarUsuarios = false;
  mostrarVendedores = false;
  mostrarTipos = false;
  mostrarMarcas = false; 
  mostrarReportes= false;

  constructor(private router: Router) {}

  resetMenu(): void {
    this.mostrarProductos = false;
    this.mostrarUsuarios = false;
    this.mostrarVendedores = false;
    this.mostrarTipos = false;
    this.mostrarMarcas = false; 
    this.mostrarReportes= false;
  }

  gestionarProductos(): void {
    this.resetMenu();
    this.mostrarProductos = true;
  }

  gestionarUsuarios(): void {
    this.resetMenu();
    this.mostrarUsuarios = true;
  }

  gestionarVendedores(): void {
    this.resetMenu();
    this.mostrarVendedores = true;
  }

  gestionarTipos(): void {
    this.resetMenu();
    this.mostrarTipos = true;
  }

  gestionarMarcas(): void { 
    this.resetMenu();
    this.mostrarMarcas = true;
  }

  verReportes(): void {
  this.resetMenu();
  this.mostrarReportes = true;
  }


  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
