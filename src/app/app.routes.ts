import { Routes } from '@angular/router';

import { WebLayoutComponent } from './layout/web-layout/web-layout';

import { HomeComponent } from './pages/home/home';
import { InstitutoComponent } from './pages/instituto/instituto';
import { TecnicaturasComponent } from './pages/tecnicaturas/tecnicaturas';
import { EstudianteComponent } from './pages/estudiantes/estudiantes';

import { AdminLayoutComponent } from './layout/panel-layout/panel-layout';
import { NovedadComponent } from './pages/novedad/novedad';
import { NovedadesComponent } from './pages/novedades/novedades';
import { BorradorComponent } from './pages/borradores/borradores';

export const routes: Routes = [
  {
    path: '',
    component: WebLayoutComponent, // 👈 WEB IFTS
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio').then(c => c.InicioComponent)
      },
      { path: 'instituto', component: InstitutoComponent },
      { path: 'tecnicaturas', component: TecnicaturasComponent },
      { path: 'estudiantes', component: EstudianteComponent },
      {
        path: 'carreras',
        loadComponent: () => import('./pages/carreras/carreras').then(c => c.CarrerasComponent)
      },
      {
        path: 'noticias',
        loadComponent: () => import('./pages/noticias/lista-noticias/lista-noticias').then(c => c.ListaNoticiasComponent)
      },
      {
        path: 'noticias/:id',
        loadComponent: () => import('./pages/noticias/detalle-noticia/detalle-noticia').then(c => c.DetalleNoticiaComponent)
      }
    ]
  },
  {
    path: 'panel',
    component: AdminLayoutComponent, // 👈 PANEL IFTS
    children: [
      { path: 'novedad', component: NovedadComponent },
      { path: 'novedades', component: NovedadesComponent },
      { path: 'borradores', component: BorradorComponent }
    ]
  }
];
