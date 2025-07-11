import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendedor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vendedor-dashboard.html',
  styleUrls: ['./vendedor-dashboard.scss']
})
export class VendedorDashboardComponent {
  username = localStorage.getItem('username') || 'Vendedor';

  constructor(private router: Router) {}

  cerrarSesion(): void {
    localStorage.clear(); // o usa tu AuthService si prefieres
    this.router.navigate(['/']);
  }

  irANuevaVenta(): void {
  this.router.navigate(['/ventas/nueva']);
}

}
