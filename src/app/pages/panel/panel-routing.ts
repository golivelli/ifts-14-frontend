import { Routes } from '@angular/router';
import { PanelLayoutComponent } from './panel-layout/panel-layout.component';

export const PANEL_ROUTES: Routes = [
  {
    path: '',
    component: PanelLayoutComponent,
    children: [
      {
        path: 'horarios',
        loadComponent: () =>
          import('./horarios/horarios.component').then(m => m.HorariosComponent)
      },
      {
        path: 'novedades',
        loadComponent: () =>
          import('./novedades/novedades.component').then(m => m.NovedadesComponent)
      },
      {
        path: '',
        redirectTo: 'horarios',
        pathMatch: 'full'
      }
    ]
  }
];
