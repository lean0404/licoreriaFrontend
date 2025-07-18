import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Marca } from '../../model/marca';
import { MarcaService } from '../../servicios/marca';

@Component({
  selector: 'app-admin-marcas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-marcas.html',
  styleUrls: ['./admin-marcas.scss']
})
export class AdminMarcasComponent implements OnInit {
  marcas: Marca[] = [];
  marcaNueva: Marca = { id: 0, nombre: '' };
  editando: boolean = false;

  constructor(private marcaService: MarcaService) {}

  ngOnInit(): void {
    this.obtenerMarcas();
  }

  obtenerMarcas(): void {
    this.marcaService.getMarcas().subscribe(data => {
      this.marcas = data;
    });
  }

  guardarMarca(): void {
    const nombreValido = this.marcaNueva.nombre && this.marcaNueva.nombre.trim() !== '';
    if (!nombreValido) {
      alert('El nombre de la marca no puede estar vacío');
      return;
    }

    if (this.editando && this.marcaNueva.id && this.marcaNueva.id > 0) {
      this.marcaService.actualizarMarca(this.marcaNueva.id, this.marcaNueva).subscribe(() => {
        this.obtenerMarcas();
        this.cancelar();
      });
    } else {
      this.marcaService.crearMarca(this.marcaNueva).subscribe(() => {
        this.obtenerMarcas();
        this.cancelar();
      });
    }
  }

  editar(marca: Marca): void {
    this.marcaNueva = { ...marca };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta marca?')) {
      this.marcaService.eliminarMarca(id).subscribe(() => {
        this.obtenerMarcas();
      });
    }
  }

  cancelar(): void {
    this.marcaNueva = { id: 0, nombre: '' };
    this.editando = false;
  }
  
}
