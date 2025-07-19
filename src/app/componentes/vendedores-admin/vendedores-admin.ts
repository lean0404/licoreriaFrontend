import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendedores-admin',
  standalone: true,
  templateUrl: './vendedores-admin.html',
  styleUrls: ['./vendedores-admin.scss'],
  imports: [CommonModule, FormsModule]  // <-- IMPORTANTE
})
export class VendedoresAdminComponent implements OnInit {
  vendedores: { id: number; username: string; }[] = [];
  contrasenas: { [id: number]: string } = {};

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarVendedores();
  }

  cargarVendedores(): void {
    this.http.get<{ id: number; username: string; }[]>('http://localhost:8080/api/auth/vendedores', {
      withCredentials: true
    }).subscribe({
      next: data => {
        this.vendedores = data;
        this.contrasenas = {};
      },
      error: err => {
        console.error('Error al cargar vendedores', err);
        alert('No se pudo cargar la lista de vendedores');
      }
    });
  }

  actualizarPassword(id: number): void {
    const nuevaPassword = this.contrasenas[id]?.trim();

    if (!nuevaPassword) {
      alert('Ingrese una nueva contraseña');
      return;
    }

    const username = this.vendedores.find(v => v.id === id)?.username;

    if (!username) {
      alert('Usuario no encontrado');
      return;
    }

    this.authService.actualizarVendedor(id, {
      username,
      password: nuevaPassword,
      roles: ['VENDEDOR']
    }).subscribe({
      next: () => {
        alert('Contraseña actualizada correctamente');
        this.contrasenas[id] = '';
      },
      error: err => {
        console.error('Error al actualizar vendedor', err);
        alert('No se pudo actualizar la contraseña');
      }
    });
  }
}
