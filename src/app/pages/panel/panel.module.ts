import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PanelRoutingModule
  ]
})
export class PanelModule {}
