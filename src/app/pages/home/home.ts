import { Component } from '@angular/core';

import { HeroSection } from '@/app/components/pages/home/hero-section/hero-section';
import { AcademySection } from '@/app/components/pages/home/academy-section/academy-section';
import { CareerSkills } from '@/app/components/pages/home/career-skills/career-skills';
import { InnovationTransform } from '@/app/components/pages/home/innovation-transform/innovation-transform';
import { InspiringExperiences } from '@/app/components/pages/home/inspiring-experiences/inspiring-experiences';
import { FrequentlyAsked } from '@/app/components/pages/home/frequently-asked/frequently-asked';

@Component({
  selector: 'app-home',
  imports: [HeroSection, AcademySection, CareerSkills, InnovationTransform, InspiringExperiences, FrequentlyAsked],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class HomeComponent {
  
}