import { Horario, HorariosService } from '@/app/services/horarios.service';
import { Component, inject, signal } from '@angular/core';

interface HorariosMap {
  [key: string]: Horario[];
}

@Component({
  selector: 'app-schedules-and-calendar',
  imports: [],
  templateUrl: './schedules-and-calendar.html',
  styleUrl: './schedules-and-calendar.css',
})
export class SchedulesAndCalendar {
  private horariosService = inject(HorariosService);

  seccionActiva = signal<string>('');
  carreraSeleccionada = signal<string>('');

  // Almacena los horarios agrupados por año/división
  horariosAgrupados = signal<HorariosMap>({});
  cargando = signal<boolean>(false);

  ngOnInit() {
    // Si quisieras cargar algo al inicio
  }

  toggleSeccion(seccion: string): void {
    if (this.seccionActiva() === seccion) {
      this.seccionActiva.set('');
    } else {
      this.seccionActiva.set(seccion);
    }
  }

  cambiarCarrera(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const carrera = select.value;
    this.carreraSeleccionada.set(carrera);

    if (carrera) {
      this.cargarHorarios(carrera);
    } else {
      this.horariosAgrupados.set({});
    }
  }

  cargarHorarios(carrera: string) {
    this.cargando.set(true);
    this.horariosService.getHorarios(carrera).subscribe({
      next: (data) => {
        const agrupados = this.agruparHorarios(data);
        this.horariosAgrupados.set(agrupados);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar horarios', err);
        this.cargando.set(false);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  private agruparHorarios(horarios: Horario[]): HorariosMap {
    return horarios.reduce((acc, curr) => {
      const key = curr.anio_division;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {} as HorariosMap);
  }

  getAniosUnicos() {
    return Object.keys(this.horariosAgrupados());
  }

  getHorariosPorAnio(anio: string): Horario[] {
    return this.horariosAgrupados()[anio] || [];
  }
}

