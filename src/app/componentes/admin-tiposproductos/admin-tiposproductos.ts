import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoProducto } from '../../model/tipo-producto.model';
import { TipoProductoService } from '../../servicios/tipo-producto';

@Component({
  selector: 'app-admin-tiposproductos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tiposproductos.html',
  styleUrls: ['./admin-tiposproductos.scss']
})
export class AdminTiposProductos implements OnInit {
  tipos: TipoProducto[] = [];
  tipoNuevo: TipoProducto = { id: 0, nombre: '' };
  editando: boolean = false;

  constructor(private tipoService: TipoProductoService) {}

  ngOnInit(): void {
    this.obtenerTipos();
  }

  obtenerTipos(): void {
    this.tipoService.getTipos().subscribe(data => {
      this.tipos = data;
    });
  }

  guardarTipo(): void {
    const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/.test(this.tipoNuevo.nombre.trim());
    if (!nombreValido) {
      alert('El nombre debe contener solo letras y espacios.');
      return;
    }

    if (this.editando && this.tipoNuevo.id && this.tipoNuevo.id > 0) {
      this.tipoService.actualizarTipo(this.tipoNuevo.id, this.tipoNuevo).subscribe(() => {
        this.obtenerTipos();
        this.cancelar();
      });
    } else {
      this.tipoService.crearTipo(this.tipoNuevo).subscribe(() => {
        this.obtenerTipos();
        this.cancelar();
      });
    }
  }

  editar(tipo: TipoProducto): void {
    this.tipoNuevo = { ...tipo };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este tipo de producto?')) {
      this.tipoService.eliminarTipo(id).subscribe(() => {
        this.obtenerTipos();
      });
    }
  }

  cancelar(): void {
    this.tipoNuevo = { id: 0, nombre: '' };
    this.editando = false;
  }
}
