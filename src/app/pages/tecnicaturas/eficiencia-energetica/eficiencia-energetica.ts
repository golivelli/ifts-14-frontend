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
  // ---------------------------------------------
  // DATOS DE LA CARRERA
  // ---------------------------------------------
  carreraDetalle: Carrera = {
    id: 'eficiencia',
    icon: 'assets/icons/iconEficienciaEnergetica.png',
    nombreCorto: 'Eficiencia energética',
    nombreCompleto: 'Tecnicatura superior en eficiencia energética',
    descripcion: 'Especialización en optimización energética y sostenibilidad ambiental.',
    descripcionCompleta:
      'La tecnicatura superior en eficiencia energética forma técnicos capaces de optimizar el consumo energético en diversos sectores. Los estudiantes aprenden a realizar auditorías energéticas, implementar sistemas de gestión de energía y desarrollar proyectos de energías renovables y sostenibilidad ambiental.',
    informacion: [
      { titulo: 'Duración', valor: '3 años', icono: 'duration' },
      { titulo: 'Modalidad', valor: 'Presencial', icono: 'modality' },
      { titulo: 'Turno', valor: 'Mañana/Tarde', icono: 'schedule' },
      { titulo: 'Sede', valor: 'IFTS N.° 14 - Cochabamba 2830 (CABA)', icono: 'location' }
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

  // ---------------------------------------------
  // ACORDEONES
  // ---------------------------------------------
  acordeonesAbiertos = signal<boolean[]>([false, false, false]);

  toggleAcordeon(index: number): void {
    const estados = [...this.acordeonesAbiertos()];
    estados[index] = !estados[index];
    this.acordeonesAbiertos.set(estados);
  }

  esAcordeonAbierto(index: number): boolean {
    return this.acordeonesAbiertos()[index];
  }

  // ---------------------------------------------
  // PLAN DE ESTUDIOS
  // ---------------------------------------------
    materias: Record<number, Materia[]> = {
    1: [
      { nombre: 'Fisica', horas: 120 },
      { nombre: 'Algebra lineal', horas: 120 },
      { nombre: 'Analisis matematico', horas: 120 },
      { nombre: 'Ambiente, sociedad y energia', horas: 120 },
      { nombre: 'Representacion grafica especifica', horas: 120 },
      { nombre: 'Fuentes de la energia', horas: 120 },
      { nombre: 'Ingles', horas: 120 },
      { nombre: 'Practica profesionalizante 1: Aproximacion al campo laboral', horas: 120 }
    ],
    2: [
      { nombre: 'Evaluacion energetica de edificios', horas: 120 },
      { nombre: 'Sistemas de climatizacion', horas: 120 },
      { nombre: 'Instalaciones electricas', horas: 120 },
      { nombre: 'Problematicas socioeconomicas de la energia', horas: 120 },
      { nombre: 'Diseno y evaluacion de proyectos', horas: 120 },
      { nombre: 'Electricidad y magnetismo', horas: 120 },
      { nombre: 'Principio de los circuitos', horas: 120 },
      { nombre: 'Practica profesionalizante 2: Diagnostico y proyectos', horas: 120 }
    ],
    3: [
      { nombre: 'Instalaciones industriales', horas: 160 },
      { nombre: 'Ingles tecnico', horas: 160 },
      { nombre: 'Instalacion y aplicacion de energias renovables', horas: 120 },
      { nombre: 'Gestion energetica', horas: 200 },
      { nombre: 'Sistemas de representacion', horas: 120 },
      { nombre: 'Termodinamica y maquinas termicas', horas: 120 },
      { nombre: 'Uso racional de la energia en edificios', horas: 120 },
      { nombre: 'Practica profesionalizante 3: Auditorias energeticas', horas: 200 }
    ]
  };

  obtenerMaterias(anio: number): Materia[] {
    return this.materias[anio] || [];
  }

  // ---------------------------------------------
  // DESCARGA PDF
  // ---------------------------------------------
  descargarPDF(): void {
    const url = '/assets/pdf/plan-estudio-eficiencia.pdf';
    const link = document.createElement('a');
    link.href = encodeURI(url);
    link.download = 'plan-estudio-eficiencia.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


