import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './componentes/login/login';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard';
import { ProductosAdminComponent } from './componentes/productos-admin/productos-admin';
import { VendedorDashboardComponent } from './componentes/vendedor-dashboard/vendedor-dashboard';
import { NuevaVentaComponent } from './componentes/nueva-venta/nueva-venta';
import { VendedorHistorialVentasComponent } from './componentes/vendedor-historial-ventas/vendedor-historial-ventas';

import { adminGuard, vendedorGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/productos',
    component: ProductosAdminComponent,
    canActivate: [adminGuard]
  },

  {
    path: 'ventas',
    component: VendedorDashboardComponent,
    canActivate: [vendedorGuard]
  },
  {
    path: 'ventas/nueva',
    component: NuevaVentaComponent,
    canActivate: [vendedorGuard]
  },
  {
    path: 'historial',
    component: VendedorHistorialVentasComponent,
    canActivate: [vendedorGuard]
  },

  { path: '**', redirectTo: '' } 
];

export const routing = provideRouter(routes);
