import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.error = '';

        const rol = this.authService.getRolActual();

        if (rol === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (rol === 'VENDEDOR') {
          this.router.navigate(['/ventas']);
        } else {
          this.error = 'Rol no reconocido';
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.error = 'Credenciales inválidas';
      }
    });
  }
}
