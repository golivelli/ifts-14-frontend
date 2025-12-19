import { Component, signal, inject, OnInit } from '@angular/core';
import { HorariosService, Horario } from '../../services/horarios.service';
import { AccessSiuAndAulavirtual } from '@/app/components/pages/estudiantes/access-siu-and-aulavirtual/access-siu-and-aulavirtual';
import { ProceduresAndCertifications } from '@/app/components/pages/estudiantes/procedures-and-certifications/procedures-and-certifications';
import { SchedulesAndCalendar } from '@/app/components/pages/estudiantes/schedules-and-calendar/schedules-and-calendar';
import { ScholarshipOpportunities } from '@/app/components/pages/estudiantes/scholarship-opportunities/scholarship-opportunities';
import { SupportAndGuidance } from '@/app/components/pages/estudiantes/support-and-guidance/support-and-guidance';

interface HorariosMap {
  [key: string]: Horario[];
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [SchedulesAndCalendar, AccessSiuAndAulavirtual, ProceduresAndCertifications, SupportAndGuidance, ScholarshipOpportunities],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class EstudiantesComponent implements OnInit {
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

  descargarDocumento(tipo: string): void {
    console.log(`Descargando documento: ${tipo}`);
    const pdfUrls: { [key: string]: string } = {
      'constancia-regular': '/assets/Constancia_Alumno_Regular.pdf',
      'constancia-examenes': '/assets/Constancia_Examenes.pdf',
      'constancia-materias': '/assets/Constancia_Materias.pdf',
      'solicitud-equivalencias': '/assets/Form Solicitud Equivalencia IFTS 14.pdf',
      'guia-equivalencias': '/assets/Guía de Procedimiento.docx.pdf'
    };

    const url = pdfUrls[tipo];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'documento.pdf';
      link.click();
    } else {
      alert(`Iniciando descarga de ${tipo} (Simulado - Archivo no encontrado)`);
    }
  }

  verGuia(event: Event): void {
    event.preventDefault();
    alert('Abriendo guía de uso del aula virtual');
  }

  contactarSoporte(event: Event): void {
    event.preventDefault();
    alert('Redirigiendo a soporte técnico');
  }
}
