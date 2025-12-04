import { Card } from '@/app/components/globals/card-novedad/card';
import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-academy-section',
  imports: [PrimaryButton, Card],
  templateUrl: './academy-section.html',
  styleUrl: './academy-section.css'
})
export class AcademySection {
  activeTab: 'anuncio' | 'novedad' = 'anuncio';

  setActiveTab(tab: 'anuncio' | 'novedad') {
    this.activeTab = tab;
  }
}
