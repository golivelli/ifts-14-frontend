import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';

@Component({
  selector: 'app-career-skills',
  imports: [PrimaryButton, RouterLink],
  templateUrl: './career-skills.html',
  styleUrl: './career-skills.css'
})
export class CareerSkills {

}
