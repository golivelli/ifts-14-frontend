import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-access-siu-and-aulavirtual',
  imports: [],
  templateUrl: './access-siu-and-aulavirtual.html',
  styleUrl: './access-siu-and-aulavirtual.css',
})
export class AccessSiuAndAulavirtual {
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
