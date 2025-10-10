import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TecnicaturasComponent } from './tecnicaturas';

const routes: Routes = [
{
    path: '',
    component: TecnicaturasComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./tecnicatura.module').then(
            (m) => m.TecnicaturaPageModule
          ),
      },
      {
        path: 'tecnicatura-1',
        loadChildren: () =>
          import('./tecnicatura-1/tecnicatura-1.module').then(
            (m) => m.Tecnicatura1Module
          ),
      },
    //   {
    //     path: 'tecnicatura-2',
    //     loadChildren: () =>
    //       import('').then(
    //         (m) => m.
    //       ),
    //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TecnicaturaPageRoutingModule {}
