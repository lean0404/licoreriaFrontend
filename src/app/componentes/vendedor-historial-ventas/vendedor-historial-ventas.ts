import { Component } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { VentaService } from '../../servicios/venta';
import { VentaHistorialDTO } from '../../model/VentaHistorialDTO';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vendedor-historial-ventas',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe, DatePipe],
  templateUrl: './vendedor-historial-ventas.html',
  styleUrls: ['./vendedor-historial-ventas.scss']
})
export class VendedorHistorialVentasComponent {
  ventas: VentaHistorialDTO[] = [];
  fechaDesde = '';
  fechaHasta = '';

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.ventaService.obtenerHistorial().subscribe({
      next: (data) => this.ventas = data,
      error: (err) => console.error('Error al cargar historial', err)
    });
  }

  filtrarPorFechas(): void {
    if (!this.fechaDesde || !this.fechaHasta) {
      alert("Selecciona el rango de fechas");
      return;
    }
    this.ventaService.obtenerHistorialPorFechas(this.fechaDesde, this.fechaHasta).subscribe({
      next: (data) => this.ventas = data,
      error: (err) => console.error('Error al filtrar historial', err)
    });
  }
}
