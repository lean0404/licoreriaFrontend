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
  cargando = false; // 🌀 loader

  constructor(private ventaService: VentaService) {}

  ngOnInit(): void {
    this.cargarHistorial();
  }

  cargarHistorial(): void {
    this.cargando = true;
    this.ventaService.obtenerHistorial().subscribe({
      next: (data) => {
        this.ventas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar historial', err);
        this.cargando = false;
      }
    });
  }

  filtrarPorFechas(): void {
    if (!this.fechaDesde || !this.fechaHasta) {
      alert("Selecciona el rango de fechas");
      return;
    }

    this.cargando = true;
    this.ventaService.obtenerHistorialPorFechas(this.fechaDesde, this.fechaHasta).subscribe({
      next: (data) => {
        this.ventas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al filtrar historial', err);
        this.cargando = false;
      }
    });
  }

  emitirReporte(): void {
    if (!this.fechaDesde || !this.fechaHasta) {
      alert("Primero selecciona un rango de fechas para emitir el reporte.");
      return;
    }

    this.cargando = true;
    this.ventaService.emitirReportePorFechas(this.fechaDesde, this.fechaHasta).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_ventas_${this.fechaDesde}_a_${this.fechaHasta}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al emitir reporte PDF', err);
        this.cargando = false;
      }
    });
  }
}
