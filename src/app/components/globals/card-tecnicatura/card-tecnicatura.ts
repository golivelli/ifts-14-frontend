import { Component, Input } from '@angular/core';
import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';

@Component({
  selector: 'app-card-tecnicatura',
  imports: [PrimaryButton],
  templateUrl: './card-tecnicatura.html',
  styleUrl: './card-tecnicatura.css',
})
export class CardTecnicatura {
  @Input() iconTecnicatura: string = '';
  @Input() nameTecnicatura: string = '';
  @Input() descTecnicatura: string = '';

  @Input() routerLink: string = '';
}

