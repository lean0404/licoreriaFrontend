import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../model/producto';
import { TipoProducto } from '../../model/tipo-producto.model';
import { ProductoService } from '../../servicios/producto';
import { TipoProductoService } from '../../servicios/tipo-producto';

@Component({
  selector: 'app-productos-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos-admin.html',
  styleUrls: ['./productos-admin.scss']
})
export class ProductosAdminComponent implements OnInit {
  productos: Producto[] = [];
  tiposProducto: TipoProducto[] = [];

  // Adaptado a tu ProductoRequest / ProductoResponse
  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    tipoProductoId: null as number | null
  };

  editandoId: number | null = null;

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarTiposProducto();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => this.productos = productos,
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.obtenerTiposProducto().subscribe({
      next: (tipos) => this.tiposProducto = tipos,
      error: (err) => console.error('Error al cargar tipos', err)
    });
  }

  guardarProducto(): void {
    if (this.editandoId) {
      this.productoService.actualizarProducto(this.editandoId, this.nuevoProducto).subscribe({
        next: () => {
          this.cargarProductos();
          this.resetFormulario();
        },
        error: (err) => console.error('Error al actualizar', err)
      });
    } else {
      this.productoService.crearProducto(this.nuevoProducto).subscribe({
        next: () => {
          this.cargarProductos();
          this.resetFormulario();
        },
        error: (err) => console.error('Error al crear', err)
      });
    }
  }

  editarProducto(producto: Producto): void {
    this.nuevoProducto = {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      tipoProductoId: producto.tipoProductoId ?? null
    };
    this.editandoId = producto.id ?? null;
  }

  confirmarEliminacion(id: number): void {
    if (confirm("¿Está seguro de eliminar este producto? Esta acción no se puede deshacer.")) {
      this.eliminarProducto(id);
    }
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => this.cargarProductos(),
      error: (err) => console.error('Error al eliminar', err)
    });
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      tipoProductoId: null
    };
    this.editandoId = null;
  }
}
