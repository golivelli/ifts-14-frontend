import { Routes } from '@angular/router';

import { SistemasEmbebidosComponent } from './sistemas-embebidos/sistemas-emebidos';
import { EficienciaEnergeticaComponent } from './eficiencia-energetica/eficiencia-energetica';
import { TecnicaturasComponent } from './tecnicaturas';

export const routesTecnicaturas: Routes = [
  {
    path: 'tecnicaturas',
    children: [
      { path: '', component: TecnicaturasComponent },
      { path: 'sistemas-embebidos', component: SistemasEmbebidosComponent },
      { path: 'eficiencia-energetica', component: EficienciaEnergeticaComponent },
    ]
  }
];
