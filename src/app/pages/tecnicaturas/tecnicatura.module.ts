import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TecnicaturasComponent } from './tecnicaturas';
import { TecnicaturaPageRoutingModule } from './tecnicatura-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    TecnicaturasComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    TecnicaturaPageRoutingModule
  ],
})
export class TecnicaturaPageModule {}