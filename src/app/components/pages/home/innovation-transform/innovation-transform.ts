import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';

@Component({
  selector: 'app-innovation-transform',
  imports: [PrimaryButton, RouterLink],
  templateUrl: './innovation-transform.html',
  styleUrl: './innovation-transform.css'
})
export class InnovationTransform {

}
