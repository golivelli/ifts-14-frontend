import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-horarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent {

    constructor(private router: Router) {}


  filtroTexto = '';
  filtroAnio = '';

  horarios = [
    { id: 'h1', dia: 'Lunes', franja: '08:00 - 10:00', anio: '1º', materia: 'Matemática I', profesor: 'Ana Gómez' },
    { id: 'h2', dia: 'Lunes', franja: '10:00 - 12:00', anio: '2º', materia: 'Programación II', profesor: 'Carlos Ruiz' },
    { id: 'h3', dia: 'Martes', franja: '09:00 - 11:00', anio: '3º', materia: 'Bases de Datos III', profesor: 'Laura Méndez' },
    { id: 'h4', dia: 'Miércoles', franja: '13:00 - 15:00', anio: '1º', materia: 'Introducción a la Programación', profesor: 'Carlos Ruiz' },
    { id: 'h5', dia: 'Jueves', franja: '11:00 - 13:00', anio: '2º', materia: 'Redes y Comunicaciones', profesor: 'Pedro Martín' }
  ];

  filtrarHorarios() {
    // tu implementación actual
    return this.horarios.filter(h => {
      const filtroTexto = this.filtroTexto.toLowerCase();
      const matchTexto =
        h.materia.toLowerCase().includes(filtroTexto) ||
        h.profesor.toLowerCase().includes(filtroTexto);
      const matchAnio = this.filtroAnio ? h.anio === this.filtroAnio : true;
      return matchTexto && matchAnio;
    });
  }

  agregar() {
  this.router.navigate(['/panel/horarios/agregar']);
}


  editar(id: String) {
this.router.navigate(['/panel/horarios/editar', id]);  }

  eliminar(item: any) {
    console.log("Eliminar", item);
  }

}
