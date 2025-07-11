import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './servicios/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRolActual() === 'ADMIN') {
    return true;
  }

  alert('Acceso denegado: se requiere rol ADMIN.');
  router.navigate(['/']);
  return false;
};

export const vendedorGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getRolActual() === 'VENDEDOR') {
    return true;
  }

  alert('Acceso denegado: se requiere rol VENDEDOR.');
  router.navigate(['/']);
  return false;
};
