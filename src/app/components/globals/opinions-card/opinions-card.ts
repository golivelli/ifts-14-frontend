import { Component, Input } from '@angular/core';

export interface Testimonio {
  id: number;
  nombre: string;
  carrera: string; // O 'rol'
  texto: string;
  rating: number; // Para las estrellitas tipo Google (1-5)
}

@Component({
  selector: 'app-opinions-card',
  imports: [],
  templateUrl: './opinions-card.html',
  styleUrl: './opinions-card.css'
})
export class OpinionsCard {
  @Input() testimonio!: Testimonio;
}