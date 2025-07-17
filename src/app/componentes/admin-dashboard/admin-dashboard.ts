import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosAdminComponent } from '../productos-admin/productos-admin';
import { UsuariosAdminComponent } from '../usuarios-admin/usuarios-admin';
import { VendedoresAdminComponent } from '../vendedores-admin/vendedores-admin';
import { AdminTiposProductos} from '../admin-tiposproductos/admin-tiposproductos';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ProductosAdminComponent,
    UsuariosAdminComponent,
    VendedoresAdminComponent,
    AdminTiposProductos
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  username = localStorage.getItem('username') || 'Admin';

  mostrarProductos = false;
  mostrarUsuarios = false;
  mostrarVendedores = false;
  mostrarTipos = false; // 👈 Nueva variable

  constructor(private router: Router) {}

  gestionarProductos(): void {
    this.mostrarProductos = true;
    this.mostrarUsuarios = false;
    this.mostrarVendedores = false;
    this.mostrarTipos = false;
  }

  gestionarUsuarios(): void {
    this.mostrarUsuarios = true;
    this.mostrarProductos = false;
    this.mostrarVendedores = false;
    this.mostrarTipos = false;
  }

  gestionarVendedores(): void {
    this.mostrarVendedores = true;
    this.mostrarProductos = false;
    this.mostrarUsuarios = false;
    this.mostrarTipos = false;
  }

  gestionarTipos(): void { // 👈 Nuevo método
    this.mostrarTipos = true;
    this.mostrarProductos = false;
    this.mostrarUsuarios = false;
    this.mostrarVendedores = false;
  }

  verReportes(): void {
    alert('Funcionalidad de reportes aún no implementada.');
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
