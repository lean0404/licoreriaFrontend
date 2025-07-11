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

  finalizarVenta(): void {
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
    withCredentials: true  // 🔥 importante para enviar la cookie de sesión
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
