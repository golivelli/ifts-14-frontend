import { CardTeachers } from '@/app/components/globals/card-teachers/card-teachers';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-support-and-guidance',
  imports: [CardTeachers],
  templateUrl: './support-and-guidance.html',
  styleUrl: './support-and-guidance.css',
})
export class SupportAndGuidance {
  // Guarda el nombre de la sección abierta
  private seccion = signal<string | null>(null);

  // Devuelve cuál sección está activa
  seccionActiva() {
    return this.seccion();
  }

  // Abre/cierra sección
  toggleSeccion(nombre: string) {
    // Si clickea la misma → alternar
    if (this.seccion() === nombre) {
      this.seccion.set(null);
    } else {
      this.seccion.set(nombre);
    }
  }
}
