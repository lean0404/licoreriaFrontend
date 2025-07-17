import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FiltroTipoPipe } from '../../pipes/filtro-tipo-pipe';
import { ProductoService } from '../../servicios/producto';
import { Producto } from '../../model/producto';

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroTipoPipe],
  templateUrl: './nueva-venta.html',
  styleUrls: ['./nueva-venta.scss']
})
export class NuevaVentaComponent implements OnInit {
  productos: Producto[] = [];
  filtroTexto: string = '';
  precioMin: number | null = null;
  precioMax: number | null = null;

  carrito: any[] = [];
  metodoPago: string = 'Efectivo';

  tipoComprobante: string = 'Boleta';
  documentoCliente: string = '';

  errorDocumento: string = '';
  errorBuscar: string = '';

  private apiUrl = 'http://localhost:8080/api/ventas';

  constructor(
    private productoService: ProductoService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => this.productos = productos,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  agregarProducto(producto: Producto): void {
    const item = this.carrito.find(i => i.producto.id === producto.id);
    if (item) {
      item.cantidad++;
    } else {
      this.carrito.push({ producto, cantidad: 1, precioUnitario: producto.precio });
    }
  }

  calcularTotal(): number {
    return this.carrito.reduce((sum, i) => sum + (i.cantidad * i.precioUnitario), 0);
  }

  validarDocumento(): void {
    if (this.tipoComprobante === 'Boleta') {
      const dniPattern = /^[0-9]{8}$/;
      this.errorDocumento = dniPattern.test(this.documentoCliente)
        ? ''
        : 'El DNI debe tener exactamente 8 dígitos.';
    } else if (this.tipoComprobante === 'Factura') {
      const rucPattern = /^[0-9]{1,15}$/;
      this.errorDocumento = rucPattern.test(this.documentoCliente)
        ? ''
        : 'El RUC debe tener entre 1 y 15 dígitos.';
    } else {
      this.errorDocumento = '';
    }
  }

  soloNumeros(event: KeyboardEvent): void {
    if (!/[0-9]/.test(event.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  }

  soloLetras(event: KeyboardEvent): void {
    if (!/[a-zA-Z\s]/.test(event.key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault();
    }
  }

  validarBuscar(): void {
    const textoPattern = /^[a-zA-Z\s]*$/;
    this.errorBuscar = textoPattern.test(this.filtroTexto)
      ? ''
      : 'Solo se permiten letras y espacios.';
  }

  finalizarVenta(): void {
    this.validarDocumento();
    this.validarBuscar();

    if (this.errorDocumento || this.errorBuscar) {
      alert('Por favor corrija los errores antes de finalizar la venta.');
      return;
    }

    if (!this.documentoCliente.trim()) {
      alert(`Debe ingresar ${this.tipoComprobante === 'Boleta' ? 'DNI' : 'RUC'} del cliente.`);
      return;
    }

    const payload = {
      tipoComprobante: this.tipoComprobante,
      documentoCliente: this.documentoCliente,
      metodoPago: this.metodoPago,
      items: this.carrito.map(item => ({
        productoId: item.producto.id,
        cantidad: item.cantidad
      }))
    };

    this.http.post(this.apiUrl, payload, {
      responseType: 'blob',
      withCredentials: true
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `venta_${this.tipoComprobante}_${this.documentoCliente}.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        alert('Venta registrada correctamente.');
        this.carrito = [];
        this.documentoCliente = '';
      },
      error: (err) => {
        console.error('Error al registrar venta', err);
        alert('Error al registrar venta');
      }
    });
  }
}
