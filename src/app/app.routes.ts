import { Routes } from '@angular/router';

import { WebLayoutComponent } from './layout/web-layout/web-layout';

import { HomeComponent } from './pages/home/home';
import { InstitutoComponent } from './pages/instituto/instituto';
import { EstudiantesComponent } from './pages/estudiantes/estudiantes';

import { AdminLayoutComponent } from './layout/panel-layout/panel-layout';
import { NovedadComponent } from './pages/novedad/novedad';
import { NovedadesComponent } from './pages/novedades/novedades';
import { BorradorComponent } from './pages/borradores/borradores';
import { ContactanosComponent } from './pages/contactanos/contactanos';
import { PoliticaPrivacidad } from './components/pages/politica-privacidad/politica-privacidad';

export const routes: Routes = [
  // 🔹 Sitio público
  {
    path: '',
    component: WebLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'instituto', component: InstitutoComponent },
      {
        path: 'tecnicaturas',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/tecnicaturas/tecnicaturas').then(
                m => m.TecnicaturasComponent
              )
          },
          {
            path: 'sistemas-embebidos',
            loadComponent: () =>
              import('./pages/tecnicaturas/sistemas-embebidos/sistemas-emebidos')
                .then(m => m.SistemasEmbebidosComponent)
          },
          {
            path: 'eficiencia-energetica',
            loadComponent: () =>
              import('./pages/tecnicaturas/eficiencia-energetica/eficiencia-energetica')
                .then(m => m.EficienciaEnergeticaComponent)
          }
        ]
      },
      { path: 'estudiantes', component: EstudiantesComponent },
      {
        path: 'noticias',
        loadComponent: () => import('./pages/noticias/lista-noticias/lista-noticias').then(c => c.ListaNoticiasComponent)
      },
      {
        path: 'noticias/:id',
        loadComponent: () => import('./pages/noticias/detalle-noticia/detalle-noticia').then(c => c.DetalleNoticiaComponent)
      },
      { path: 'contactanos', component: ContactanosComponent },
      { path: 'profesores', component: EstudiantesComponent },
      // { path: 'politica-de-privacidad', component: PoliticaPrivacidad }
    ]
  },
  {
    path: 'admin-ifts14-2024',
    component: AdminLayoutComponent, // 👈 PANEL IFTS (ruta oculta)
    children: [
      { path: 'novedad', component: NovedadComponent },
      { path: 'novedad/:id', component: NovedadComponent }, // Edición
      { path: 'novedades', component: NovedadesComponent },
      { path: 'borradores', component: BorradorComponent }
    ]
  }
];
