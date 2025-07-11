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

  nuevoProducto: Producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    tipoProductoId: undefined
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
    this.productoService.obtenerProductos().subscribe(
      (productos) => this.productos = productos,
      (err) => console.error('Error al cargar productos', err)
    );
  }

  cargarTiposProducto(): void {
    this.tipoProductoService.obtenerTiposProducto().subscribe(
      (tipos) => this.tiposProducto = tipos,
      (err) => console.error('Error al cargar tipos', err)
    );
  }

  guardarProducto(): void {
  if (this.editandoId) {
    const productoParaActualizar = {
      id: this.editandoId,
      nombre: this.nuevoProducto.nombre,
      descripcion: this.nuevoProducto.descripcion,
      precio: this.nuevoProducto.precio,
      stock: this.nuevoProducto.stock,
      tipoProductoId: this.nuevoProducto.tipoProductoId
    };

    this.productoService.actualizarProducto(this.editandoId, productoParaActualizar).subscribe(
      () => {
        this.cargarProductos();
        this.resetFormulario();
      },
      (err) => console.error('Error al actualizar', err)
    );
  } else {
    this.nuevoProducto.id = 0;
    this.productoService.crearProducto(this.nuevoProducto).subscribe(
      () => {
        this.cargarProductos();
        this.resetFormulario();
      },
      (err) => console.error('Error al crear', err)
    );
  }
}


  editarProducto(producto: Producto): void {
  this.nuevoProducto = {
    id: producto.id, 
    nombre: producto.nombre,
    descripcion: producto.descripcion,
    precio: producto.precio,
    stock: producto.stock,
    tipoProductoId: producto.tipoProducto?.id
  };
  this.editandoId = producto.id ?? null;
}


  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(
      () => this.cargarProductos(),
      (err) => console.error('Error al eliminar', err)
    );
  }

  cancelarEdicion(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoProducto = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
      stock: 0,
      tipoProductoId: undefined
    };
    this.editandoId = null;
  }
}
