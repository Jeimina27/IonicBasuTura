import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home-conductor',
    loadComponent: () => import('./Pagina/home-conductor/home-conductor.page').then( m => m.HomeConductorPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./Pagina/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home-admin',
    loadComponent: () => import('./home-admin/home-admin.page').then( m => m.HomeAdminPage)
  },
];
