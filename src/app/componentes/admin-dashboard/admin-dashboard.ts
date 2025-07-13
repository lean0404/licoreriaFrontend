import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductosAdminComponent } from '../productos-admin/productos-admin';
import { UsuariosAdminComponent } from '../usuarios-admin/usuarios-admin';
import { VendedoresAdminComponent } from '../vendedores-admin/vendedores-admin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ProductosAdminComponent, UsuariosAdminComponent, VendedoresAdminComponent],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.scss']
})
export class AdminDashboardComponent {
  username = localStorage.getItem('username') || 'Admin';
  mostrarProductos = false;
  mostrarUsuarios = false;
  mostrarVendedores = false;

  constructor(private router: Router) {}

  gestionarProductos(): void {
    this.mostrarProductos = true;
    this.mostrarUsuarios = false;
    this.mostrarVendedores = false;
  }

  gestionarUsuarios(): void {
    this.mostrarUsuarios = true;
    this.mostrarProductos = false;
    this.mostrarVendedores = false;
  }

  gestionarVendedores(): void {
    this.mostrarVendedores = true;
    this.mostrarProductos = false;
    this.mostrarUsuarios = false;
  }

  verReportes(): void {
    alert('Funcionalidad de reportes aún no implementada.');
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
