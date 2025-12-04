import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-horario-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.css']
})
export class HorarioFormComponent implements OnInit {

  esModoEdicion = false;
  idHorario: string | null = null;

  formData = {
    dia: '',
    anio: '',
    materia: '',
    profesor: '',
    aula: '',
    horaInicio: '',
    horaFin: '',
    observaciones: ''
  };

  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  anios = ['Primero', 'Segundo', 'Tercero'];

  horarios: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idHorario = this.route.snapshot.paramMap.get('id');
this.esModoEdicion = !!this.idHorario;

if (this.esModoEdicion) {
  this.cargarDatosDummyPorId(this.idHorario);
}

  }

  generarHorarios(): string[] {
    const lista: string[] = [];
    let hora = 18;
    let minutos = 0;

    while (hora < 22 || (hora === 22 && minutos <= 30)) {
      const h = hora.toString().padStart(2, '0');
      const m = minutos.toString().padStart(2, '0');
      lista.push(`${h}:${m}`);

      minutos += 30;
      if (minutos >= 60) {
        minutos = 0;
        hora++;
      }
    }
    return lista;
  }

  cargarDatosDummy() {
    this.formData = {
      dia: 'Lunes',
      anio: 'Segundo',
      materia: 'Matemática',
      profesor: 'Prof. García',
      aula: 'Aula 3',
      horaInicio: '19:00',
      horaFin: '21:00',
      observaciones: 'Clase habitual'
    };
  }

cargarDatosDummyPorId(id: string | null) {
  if (!id) return;

  const dummy = [
    {
      id: 'h1',
      dia: 'Lunes',
      anio: 'Primer año',
      materia: 'Matemática I',
      profesor: 'Ana Gómez',
      aula: 'Aula 1',
      horaInicio: '18:00',
      horaFin: '19:30',
      observaciones: 'Clase habitual'
    },
    {
      id: 'h2',
      dia: 'Martes',
      anio: 'Segundo año',
      materia: 'Programación II',
      profesor: 'Carlos Ruiz',
      aula: 'Aula 4',
      horaInicio: '19:30',
      horaFin: '21:00',
      observaciones: 'Traer notebook'
    }
  ];

  const encontrado = dummy.find(h => h.id === id);

  this.formData = {
    dia: encontrado?.dia ?? '',
    anio: encontrado?.anio ?? '',
    materia: encontrado?.materia ?? '',
    profesor: encontrado?.profesor ?? '',
    aula: encontrado?.aula ?? '',
    horaInicio: encontrado?.horaInicio ?? '',
    horaFin: encontrado?.horaFin ?? '',
    observaciones: encontrado?.observaciones ?? ''
  };
}



  guardar() {
    if (this.esModoEdicion) {
      console.log('Actualizando horario:', this.formData);
    } else {
      console.log('Creando horario:', this.formData);
    }

    this.router.navigate(['/panel/horarios']);
  }

  cancelar() {
    this.router.navigate(['/panel/horarios']);
  }
}
