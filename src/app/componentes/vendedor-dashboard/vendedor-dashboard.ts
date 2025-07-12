import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NuevaVentaComponent } from '../nueva-venta/nueva-venta';
import { VendedorHistorialVentasComponent } from '../vendedor-historial-ventas/vendedor-historial-ventas';

@Component({
  selector: 'app-vendedor-dashboard',
  standalone: true,
  imports: [CommonModule, NuevaVentaComponent, VendedorHistorialVentasComponent],
  templateUrl: './vendedor-dashboard.html',
  styleUrls: ['./vendedor-dashboard.scss']
})
export class VendedorDashboardComponent {
  username = localStorage.getItem('username') || 'Vendedor';

  mostrarNuevaVentaPanel = false;
  mostrarHistorialPanel = false;

  constructor(private router: Router) {}

  cerrarSesion(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  mostrarNuevaVenta(): void {
    this.mostrarNuevaVentaPanel = true;
    this.mostrarHistorialPanel = false;
  }

  mostrarHistorial(): void {
    this.mostrarNuevaVentaPanel = false;
    this.mostrarHistorialPanel = true;
  }
}
