import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-admin.html',
  styleUrls: ['./usuarios-admin.scss']
})
export class UsuariosAdminComponent {

  nuevoUsuario = {
    username: '',
    password: '',
    roles: ['VENDEDOR'] 
  };

  constructor(private authService: AuthService) {}

  registrarUsuario(): void {
    this.authService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        alert('Usuario registrado exitosamente');
        this.nuevoUsuario = { username: '', password: '', roles: ['VENDEDOR'] };
      },
      error: (err: any) => {
        console.error('Error al registrar usuario', err);
        alert('No se pudo registrar el usuario');
      }
    });
  }
}
