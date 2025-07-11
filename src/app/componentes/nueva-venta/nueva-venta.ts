import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../model/producto';
import { ProductoService } from '../../servicios/producto';
import { TipoProductoService } from '../../servicios/tipo-producto';
import { FiltroTipoPipe } from '../../pipes/filtro-tipo-pipe';

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

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
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
    console.log('Venta finalizada', this.carrito, this.metodoPago);
    // Aquí llamarías a tu API de ventas
  }
}
