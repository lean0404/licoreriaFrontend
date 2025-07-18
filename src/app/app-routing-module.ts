import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { LoginComponent } from './componentes/login/login';
import { AdminDashboardComponent } from './componentes/admin-dashboard/admin-dashboard';
import { ProductosAdminComponent } from './componentes/productos-admin/productos-admin';
import { VendedorDashboardComponent } from './componentes/vendedor-dashboard/vendedor-dashboard';
import { NuevaVentaComponent } from './componentes/nueva-venta/nueva-venta';
import { VendedorHistorialVentasComponent } from './componentes/vendedor-historial-ventas/vendedor-historial-ventas';
import { VendedoresAdminComponent } from './componentes/vendedores-admin/vendedores-admin';
import { AdminTiposProductos } from './componentes/admin-tiposproductos/admin-tiposproductos';

import { adminGuard, vendedorGuard } from './auth.guard';
import { Component } from '@angular/core';
import { AdminMarcasComponent } from './componentes/admin-marcas/admin-marcas';

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
    path: 'admin/tipos',
    component: AdminTiposProductos,
    canActivate: [adminGuard]
  },
  {
    path: 'admin/marcas',
    component: AdminMarcasComponent,
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
  {
    path:'vendedores',
    component: VendedoresAdminComponent,
    canActivate: [adminGuard]
  },

  { path: '**', redirectTo: '' } 
];

export const routing = provideRouter(routes);
