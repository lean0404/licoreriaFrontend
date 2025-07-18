import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReporteService } from '../../servicios/reporte';

@Component({
  selector: 'app-reportes-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reportes-admin.html',
  styleUrls: ['./reportes-admin.scss']
})
export class ReportesAdminComponent {
  fechaInicio: string = '';
  fechaFin: string = '';

  listaMasVendidos: any[] = [];
  listaMenosVendidos: any[] = [];
  metodoFrecuente: string = '';
  errorMasVendidos = '';
  errorMenosVendidos = '';

  constructor(private reporteService: ReporteService) {}

  consultarMasVendido() {
    this.errorMasVendidos = '';
    this.listaMasVendidos = [];

    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMasVendidos = 'Por favor selecciona las fechas.';
      return;
    }

    this.reporteService.consultarProductoMasVendido(this.fechaInicio, this.fechaFin).subscribe({
      next: (lista: any[]) => {
        console.log('Más vendidos:', lista);
        if (lista.length > 0) {
          this.listaMasVendidos = lista;
        } else {
          this.errorMasVendidos = 'No se encontraron ventas en el rango seleccionado.';
        }
      },
      error: () => {
        this.errorMasVendidos = 'Error al obtener los productos más vendidos.';
      }
    });
  }

  consultarMenosVendido() {
    this.errorMenosVendidos = '';
    this.listaMenosVendidos = [];

    if (!this.fechaInicio || !this.fechaFin) {
      this.errorMenosVendidos = 'Por favor selecciona las fechas.';
      return;
    }

    this.reporteService.consultarProductoMenosVendido(this.fechaInicio, this.fechaFin).subscribe({
      next: (lista: any[]) => {
        console.log('Menos vendidos:', lista);
        if (lista.length > 0) {
          this.listaMenosVendidos = lista;
        } else {
          this.errorMenosVendidos = 'No se encontraron ventas en el rango seleccionado.';
        }
      },
      error: () => {
        this.errorMenosVendidos = 'Error al obtener los productos menos vendidos.';
      }
    });
  }

  consultarMetodoPagoFrecuente() {
    this.reporteService.consultarMetodoPagoMasUsado().subscribe({
      next: (dato: any) => {
        console.log('Método pago frecuente:', dato);
        if (dato && dato.metodoPago && dato.cantidad !== undefined) {
          this.metodoFrecuente = `${dato.metodoPago} (${dato.cantidad} veces usado)`;
        } else {
          this.metodoFrecuente = 'No hay datos suficientes para mostrar.';
        }
      },
      error: () => {
        this.metodoFrecuente = 'Error al obtener el método de pago más usado.';
      }
    });
  }

  descargarMasVendidosPDF() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert('Primero debes seleccionar las fechas.');
    return;
  }

  this.reporteService.descargarMasVendidosPDF(this.fechaInicio, this.fechaFin).subscribe({
    next: (pdf: Blob) => this.descargarArchivo(pdf, 'mas_vendidos.pdf'),
    error: () => alert('Error al generar el PDF de productos más vendidos.')
  });
}

descargarMenosVendidosPDF() {
  if (!this.fechaInicio || !this.fechaFin) {
    alert('Primero debes seleccionar las fechas.');
    return;
  }

  this.reporteService.descargarMenosVendidosPDF(this.fechaInicio, this.fechaFin).subscribe({
    next: (pdf: Blob) => this.descargarArchivo(pdf, 'menos_vendidos.pdf'),
    error: () => alert('Error al generar el PDF de productos menos vendidos.')
  });
}

private descargarArchivo(blob: Blob, nombreArchivo: string) {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombreArchivo;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

}
