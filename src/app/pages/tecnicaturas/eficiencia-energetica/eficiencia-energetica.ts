import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carrera {
  id: string;
  icon?: string;
  nombreCorto: string;
  nombreCompleto: string;
  descripcion: string;
  descripcionCompleta: string;
  informacion: { titulo: string; valor: string; icono: string }[];
  perfilEgresado: string[];
  requisitos: string[];
}

interface Materia {
  nombre: string;
  horas: number;
}

@Component({
  selector: 'app-eficiencia-energetica',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eficiencia-energetica.html',
  styleUrls: ['./eficiencia-energetica.css']
})
export class EficienciaEnergeticaComponent {
  // ───────────────────────────────────────────────
  //  DATOS DE LA CARRERA (CORRECTOS)
  // ───────────────────────────────────────────────

  carreraDetalle: Carrera = {
    id: 'eficiencia',
    icon: 'assets/icons/iconEficienciaEnergetica.png',
    nombreCorto: 'Eficiencia energética',
    nombreCompleto: 'Tecnicatura superior en eficiencia energética',
    descripcion: 'Especialización en optimización energética y sostenibilidad ambiental.',
    descripcionCompleta:
      'La Tecnicatura Superior en Eficiencia Energética forma técnicos capaces de optimizar el consumo energético en diversos sectores. Los estudiantes aprenden a realizar auditorías energéticas, implementar sistemas de gestión de energía y desarrollar proyectos de energías renovables y sostenibilidad ambiental.',
    informacion: [
      { titulo: 'Duración', valor: '3 años', icono: 'duration' },
      { titulo: 'Modalidad', valor: 'Presencial', icono: 'modality' },
      { titulo: 'Turno', valor: 'Mañana/Tarde', icono: 'schedule' },
      { titulo: 'Sede', valor: 'IFTS N° 14 - Cochabamba 2830 (CABA)', icono: 'location' }
    ],
    perfilEgresado: [
      'Realizar diagnósticos y auditorías energéticas',
      'Diseñar sistemas de eficiencia energética',
      'Implementar proyectos de energías renovables',
      'Gestionar optimización de consumo energético',
      'Asesorar en normativas y certificaciones energéticas'
    ],
    requisitos: [
      'Secundario completo',
      'Fotocopia de DNI (primera y segunda hoja)',
      '2 fotos carnet 4x4',
      'Certificado de aptitud física',
      'Formulario de inscripción completo'
    ]
  };

  // ───────────────────────────────────────────────
  //   ACORDEONES
  // ───────────────────────────────────────────────

  acordeonesAbiertos = signal<boolean[]>([false, false, false]);

  toggleAcordeon(index: number): void {
    const estados = [...this.acordeonesAbiertos()];
    estados[index] = !estados[index];
    this.acordeonesAbiertos.set(estados);
  }

  esAcordeonAbierto(index: number): boolean {
    return this.acordeonesAbiertos()[index];
  }

  // ───────────────────────────────────────────────
  //   PLAN DE ESTUDIOS
  // ───────────────────────────────────────────────

  materias: Record<number, Materia[]> = {
    1: [
      { nombre: 'Física', horas: 120 },
      { nombre: 'Prácticas profesionalizantes I', horas: 120 },
      { nombre: 'Representación gráfica específica', horas: 160 },
      { nombre: 'Fuentes de energía', horas: 120 },
      { nombre: 'Álgebra lineal', horas: 120 }
    ],
    2: [
      { nombre: 'Evaluación energética de edificios', horas: 120 },
      { nombre: 'Prácticas profesionalizantes II', horas: 160 },
      { nombre: 'Sistemas de climatización', horas: 160 },
      { nombre: 'Instalaciones eléctricas', horas: 120 },
      { nombre: 'Problemáticas socio económicas de la energía', horas: 120 }
    ],
    3: [
      { nombre: 'Instalaciones industriales', horas: 160 },
      { nombre: 'Inglés técnico', horas: 160 },
      { nombre: 'Instalaciones aplicadas a energías renovables', horas: 120 },
      { nombre: 'Gestión energética', horas: 200 },
      { nombre: 'Prácticas profesionalizantes III', horas: 200 }
    ]
  };

  obtenerMaterias(anio: number): Materia[] {
    return this.materias[anio] || [];
  }

  // ───────────────────────────────────────────────
  //   DESCARGA PDF
  // ───────────────────────────────────────────────

  descargarPDF(): void {
    const url = '/assets/Tecnicatura-Superior-en-Eficiencia-Energética.pdf';
    window.open(url, '_blank');
  }
}
