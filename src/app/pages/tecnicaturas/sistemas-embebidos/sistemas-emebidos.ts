import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carrera {
  id: string;
  icon?: string;
  nombreCorto: string;
  nombreCompleto: string;
  descripcion: string;
  descripcionCompleta: string;
  info: string[];
  informacion: { titulo: string; valor: string; icono: string }[];
  perfilEgresado: string[];
  requisitos: string[];
}

interface Materia {
  nombre: string;
  horas: number;
}

@Component({
  selector: 'app-sistemas-embebidos',
  imports: [CommonModule],
  templateUrl: './sistemas-emebidos.html',
  styleUrls: ['./sistemas-emebidos.css']
})
export class SistemasEmbebidosComponent {
// ───────────────────────────────────────────────
  //  DATOS DE LA CARRERA (CORRECTOS)
  // ───────────────────────────────────────────────

  carreraDetalle: Carrera = {
    id: 'sistemas',
      icon: 'assets/icons/iconSistemasEmbebidos.png',
      nombreCorto: 'Sistemas embebidos e internet de las cosas',
      nombreCompleto: 'Tecnicatura superior en sistemas embebidos e internet de las cosas',
      descripcion: 'Formación en desarrollo de sistemas inteligentes conectados y aplicaciones IoT. Programación de microcontroladores, electrónica digital y comunicaciones.',
      descripcionCompleta: 'La tecnicatura superior en sistemas embebidos e internet de las cosas forma profesionales capacitados para diseñar, desarrollar e implementar sistemas inteligentes conectados. Los estudiantes adquieren competencias en programación de microcontroladores, desarrollo de aplicaciones IoT, electrónica digital y comunicaciones inalámbricas.',
      info: ['3 años de duración', 'Modalidad Presencial', 'Turno Tarde/Noche'],
      informacion: [
        { titulo: 'Duración', valor: '3 años', icono: 'duration' },
        { titulo: 'Modalidad', valor: 'Presencial', icono: 'modality' },
        { titulo: 'Turno', valor: 'Tarde/Noche', icono: 'schedule' },
        { titulo: 'Sede', valor: 'IFTS N° 14 - Cochabamba 2830 (CABA)', icono: 'location' }
      ],
      perfilEgresado: [
        'Diseñar y programar sistemas embebidos',
        'Desarrollar aplicaciones para Internet de las Cosas',
        'Implementar soluciones de conectividad y comunicaciones',
        'Realizar testing y debugging de sistemas electrónicos',
        'Gestionar proyectos de desarrollo tecnológico'
      ],
      requisitos: [
        'Secundario completo',
        'Fotocopia de DNI (primera y segunda hoja)',
        '2 fotos carnet 4x4',
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
      { nombre: 'Desarrollo de sistemas web', horas: 120 },
      { nombre: 'Circuitos eléctricos y electrónicos', horas: 120 },
      { nombre: 'Técnicas de programación', horas: 160 },
      { nombre: 'Electrónica digital y microprocesadores', horas: 160 },
      { nombre: 'Técnicas de programación', horas: 160 },
      { nombre: 'Desarrollo y testing de software SE', horas: 160 },
      { nombre: 'Protocolos de IoT', horas: 160 },
      { nombre: 'Programación y comunicación en SE', horas: 160 },
      { nombre: 'Administración de base de datos', horas: 160 }
    ],
    2: [
      { nombre: 'Sistemas operativos en tiempo real', horas: 160 },
      { nombre: 'Ciberseguridad en IoT', horas: 160 },
      { nombre: 'Desarrollo de aplicaciones vinculadas a BD', horas: 120 }
    ],
    3: [
      { nombre: 'Procesamiento de aprendizaje automático', horas: 160 },
      { nombre: 'Proyecto integrador', horas: 160 },
      { nombre: 'Modelizado y minería de datos', horas: 120 }
    ]
  };

  obtenerMaterias(anio: number): Materia[] {
    return this.materias[anio] || [];
  }

  // ───────────────────────────────────────────────
  //   DESCARGA PDF
  // ───────────────────────────────────────────────

  descargarPDF(): void {
    const url = '/assets/Tecnicatura-Superior-en-Sistemas-Embebidos.pdf';
  }
}
