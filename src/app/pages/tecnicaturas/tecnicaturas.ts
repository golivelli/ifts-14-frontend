import { SectionTecnicaturas } from '@/app/components/pages/tecnicaturas/section-tecnicaturas/section-tecnicaturas';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tecnicaturas',
  imports: [SectionTecnicaturas, RouterOutlet],
  templateUrl: './tecnicaturas.html',
  styleUrl: './tecnicaturas.css',
  imports: [RouterOutlet],
})
export class TecnicaturasComponent {
  
}
