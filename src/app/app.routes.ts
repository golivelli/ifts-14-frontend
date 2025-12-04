import { Routes } from '@angular/router';

import { WebLayoutComponent } from './layout/web-layout/web-layout';

import { HomeComponent } from './pages/home/home';
import { InstitutoComponent } from './pages/instituto/instituto';
import { TecnicaturasComponent } from './pages/tecnicaturas/tecnicaturas';
import { EstudianteComponent } from './pages/estudiantes/estudiantes';

import { PanelLayoutComponent } from './pages/panel/panel-layout/panel-layout.component';

export const routes: Routes = [
  // 🔹 Sitio público
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'instituto', component: InstitutoComponent },
      { path: 'tecnicaturas', component: TecnicaturasComponent },
      { path: 'estudiantes', component: EstudianteComponent },
    ]
  },

  // 🔹 Panel oculto solo para profesores
  {
    path: 'panel',
    component: PanelLayoutComponent,
    children: [
      {
        path: 'horarios',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/panel/horarios/horarios.component')
                .then(m => m.HorariosComponent)
          },
          {
            path: 'agregar',
            loadComponent: () =>
              import('./pages/panel/horarios/form/horario-form.component')
                .then(m => m.HorarioFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./pages/panel/horarios/form/horario-form.component')
                .then(m => m.HorarioFormComponent)
          }
        ]
      },
      {
        path: 'novedades',
        children: [
          {
            // ruta lista: solo match cuando la url sea exactamente /panel/novedades
            path: '',
            pathMatch: 'full',
            loadComponent: () =>
              import('./pages/panel/novedades/novedades.component')
                .then(m => m.NovedadesComponent)
          },
          {
            path: 'agregar',
            loadComponent: () =>
              import('./pages/panel/novedades/form/novedades-form.component')
                .then(m => m.NovedadFormComponent)
          },
          {
            path: 'editar/:id',
            loadComponent: () =>
              import('./pages/panel/novedades/form/novedades-form.component')
                .then(m => m.NovedadFormComponent)
          }
        ]
      },

      // SOLO UNA REDIRECCIÓN por defecto para /panel
      {
        path: '',
        redirectTo: 'horarios',
        pathMatch: 'full'
      }
    ]
  }
];
