import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css'],
  
})
export class NovedadesComponent {

  
constructor(private router: Router) {}

  filtroTexto = '';
  filtroTipo = '';

  novedades = [
    { id: 'n1', titulo: 'Suspensión de clases', fecha: '2025-03-15', tipo: 'Aviso', creadoPor: 'Dirección' },
    { id: 'n2', titulo: 'Nuevo curso disponible', fecha: '2025-03-12', tipo: 'Anuncio', creadoPor: 'Secretaría' },
    { id: 'n3', titulo: 'Cambio de aula', fecha: '2025-03-10', tipo: 'Actualización', creadoPor: 'Coordinación' },
    { id: 'n4', titulo: 'Entrega de boletines', fecha: '2025-03-05', tipo: 'Aviso', creadoPor: 'Dirección' },
    { id: 'n5', titulo: 'Reunión informativa', fecha: '2025-03-01', tipo: 'Evento', creadoPor: 'Dirección' }
  ];

  filtrarNovedades() {
    return this.novedades.filter(n => {
      const texto = this.filtroTexto.toLowerCase();

      const matchTexto =
        n.titulo.toLowerCase().includes(texto) ||
        n.creadoPor.toLowerCase().includes(texto);

      const matchTipo =
        this.filtroTipo ? n.tipo === this.filtroTipo : true;

      return matchTexto && matchTipo;
    });
  }


  nuevaNovedad() {
  this.router.navigate(['/panel/novedades/agregar']);
}

editar(id: string) {
  this.router.navigate([`/panel/novedades/editar`, id]);
}

  eliminar(item: any) {
    console.log("Eliminar novedad:", item);
  }

}
