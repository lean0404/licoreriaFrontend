import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../servicios/usuario';

@Component({
  selector: 'app-vendedores-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vendedores-admin.html',
  styleUrls: ['./vendedores-admin.scss']
})
export class VendedoresAdminComponent implements OnInit {

  vendedores: any[] = [];
  contrasenas: { [key: number]: string } = {};

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listarVendedores().subscribe({
      next: (data) => this.vendedores = data,
      error: (err) => console.error('Error al cargar vendedores', err)
    });
  }

  actualizarPassword(id: number): void {
    const nuevaPass = this.contrasenas[id];
    if (!nuevaPass) return;

    this.usuarioService.actualizarPassword(id, nuevaPass).subscribe({
      next: () => {
        alert('Contraseña actualizada');
        this.contrasenas[id] = '';
      },
      error: (err) => {
        console.error('Error al actualizar contraseña', err);
        alert('No se pudo actualizar la contraseña');
      }
    });
  }
}
