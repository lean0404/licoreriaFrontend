import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../model/producto';
import { TipoProducto } from '../../model/tipo-producto.model';
import { Marca } from '../../model/marca';
import { ProductoService } from '../../servicios/producto';
import { TipoProductoService } from '../../servicios/tipo-producto';
import { MarcaService } from '../../servicios/marca';

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
  marcas: Marca[] = [];

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    tipoProductoId: null as number | null,
    marcaId: null as number | null
  };

  errores: string[] = [];
  editandoId: number | null = null;

  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private marcaService: MarcaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarTiposProducto();
    this.cargarMarcas();
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

  cargarMarcas(): void {
    this.marcaService.getMarcas().subscribe({
      next: (marcas: Marca[]) => this.marcas = marcas,
      error: (err: any) => console.error('Error al cargar marcas', err)
    });
  }

  validarFormulario(): boolean {
    this.errores = [];

    if (!this.nuevoProducto.nombre.trim()) {
      this.errores.push('El nombre es obligatorio.');
    }
    if (!this.nuevoProducto.descripcion.trim()) {
      this.errores.push('La descripción es obligatoria.');
    }
    if (this.nuevoProducto.precio <= 0) {
      this.errores.push('El precio debe ser mayor que cero.');
    }
    if (this.nuevoProducto.stock < 0) {
      this.errores.push('El stock no puede ser negativo.');
    }
    if (!this.nuevoProducto.tipoProductoId) {
      this.errores.push('Debe seleccionar un tipo de producto.');
    }
    if (!this.nuevoProducto.marcaId) {
      this.errores.push('Debe seleccionar una marca.');
    }

    return this.errores.length === 0;
  }

  guardarProducto(): void {
    if (!this.validarFormulario()) {
      return;
    }

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
      tipoProductoId: producto.tipoProductoId ?? null,
      marcaId: producto.marcaId ?? null
    };
    this.editandoId = producto.id ?? null;
    this.errores = [];
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
      tipoProductoId: null,
      marcaId: null
    };
    this.editandoId = null;
    this.errores = [];
  }
}
