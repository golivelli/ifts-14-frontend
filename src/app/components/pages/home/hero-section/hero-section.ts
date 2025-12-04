import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';

@Component({
  selector: 'app-hero-section',
  imports: [PrimaryButton, RouterLink],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css'
})
export class HeroSection {

}
