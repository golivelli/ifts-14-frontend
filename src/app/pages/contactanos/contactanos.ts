import { Component } from '@angular/core';

import { FormContactanos } from '@/app/components/pages/contactanos/form-contactanos/form-contactanos';
import { HeroContactanos } from '@/app/components/pages/contactanos/hero-contactanos/hero-contactanos';

@Component({
  selector: 'app-contactanos',
  imports: [HeroContactanos, FormContactanos],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css',
})
export class ContactanosComponent {

}
