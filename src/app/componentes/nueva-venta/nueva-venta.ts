import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../servicios/producto';
import { VentaService } from '../../servicios/venta';
import { FiltroTipoPipe } from '../../filtro-tipo-pipe';
import jsPDF from 'jspdf';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  tipoProducto?: {
    nombre: string;
  };
}

@Component({
  selector: 'app-nueva-venta',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroTipoPipe],
  templateUrl: './nueva-venta.html',
  styleUrls: ['./nueva-venta.scss']
})
export class NuevaVentaComponent implements OnInit {

  productos: Producto[] = [];
  tipos: string[] = [];
  filtroTipo: string = '';
  carrito: { producto: Producto; cantidad: number; precioUnitario: number }[] = [];
  metodoPago: string = 'Efectivo';
  vendedorId: number = 1; // O el ID actual del usuario logueado

  constructor(
    private productoService: ProductoService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (data: Producto[]) => {
        this.productos = data;
        this.tipos = Array.from(
          new Set(data.map((p) => p.tipoProducto?.nombre).filter((n): n is string => !!n))
        );
      },
      (err) => {
        console.error('Error al cargar productos:', err);
      }
    );
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
    return this.carrito.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  }

  finalizarVenta(): void {
    const detalles = this.carrito.map(item => ({
      productoId: item.producto.id,
      cantidad: item.cantidad,
      precioUnitario: item.precioUnitario
    }));

    const ventaRequest = {
      metodoPago: this.metodoPago,
      vendedorId: this.vendedorId,
      detalles
    };

    this.ventaService.registrarVenta(ventaRequest).subscribe(
      () => {
        alert('Venta registrada correctamente');
        this.generarPDF(ventaRequest);
        this.carrito = [];
      },
      (err) => {
        console.error('Error al guardar venta:', err);
        alert('Error al registrar la venta');
      }
    );
  }

  generarPDF(ventaRequest: any): void {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Boleta de Venta', 80, 20);

    doc.setFontSize(12);
    doc.text(`Método de pago: ${ventaRequest.metodoPago}`, 20, 40);

    let y = 60;
    ventaRequest.detalles.forEach((detalle: any, index: number) => {
      doc.text(`${index + 1}. Producto ID: ${detalle.productoId} | Cant: ${detalle.cantidad} | Precio: S/. ${detalle.precioUnitario}`, 20, y);
      y += 10;
    });

    const total = ventaRequest.detalles.reduce((sum: number, d: any) => sum + d.cantidad * d.precioUnitario, 0);
    doc.text(`Total: S/. ${total}`, 20, y + 10);

    doc.save('boleta_venta.pdf');
  }
}
