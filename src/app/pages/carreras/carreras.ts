import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Carrera {
  id: string;
  nombreCorto: string;
  nombreCompleto: string;
  descripcion: string;
  descripcionCompleta: string;
  info: string[];
  informacion: { titulo: string; valor: string; icono: string }[];
  perfilEgresado: string[];
  requisitos: string[];
}

interface Tab {
  id: string;
  label: string;
}

interface Materia {
  nombre: string;
  horas: number;
}

@Component({
  selector: 'app-carreras',
  imports: [CommonModule],
  templateUrl: './carreras.html',
  styleUrl: './carreras.css'
})
export class CarrerasComponent implements OnInit {
  pestaniaActiva = signal<string>('todas');
  acordeonesAbiertos = signal<Map<string, boolean[]>>(new Map());

  tabs: Tab[] = [
    { id: 'todas', label: 'Todas las carreras' },
    { id: 'sistemas', label: 'Sistemas Embebidos IoT' },
    { id: 'eficiencia', label: 'Eficiencia Energética' }
  ];

  carreras: Carrera[] = [
    {
      id: 'sistemas',
      nombreCorto: 'Sistemas Embebidos e Internet de las Cosas',
      nombreCompleto: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas',
      descripcion: 'Formación en desarrollo de sistemas inteligentes conectados y aplicaciones IoT. Programación de microcontroladores, electrónica digital y comunicaciones.',
      descripcionCompleta: 'La Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas forma profesionales capacitados para diseñar, desarrollar e implementar sistemas inteligentes conectados. Los estudiantes adquieren competencias en programación de microcontroladores, desarrollo de aplicaciones IoT, electrónica digital y comunicaciones inalámbricas.',
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
    },
    {
      id: 'eficiencia',
      nombreCorto: 'Eficiencia Energética',
      nombreCompleto: 'Tecnicatura Superior en Eficiencia Energética',
      descripcion: 'Especialización en optimización energética y sostenibilidad ambiental. Auditorías energéticas y proyectos de energías renovables.',
      descripcionCompleta: 'La Tecnicatura Superior en Eficiencia Energética forma técnicos capaces de optimizar el consumo energético en diversos sectores. Los estudiantes aprenden a realizar auditorías energéticas, implementar sistemas de gestión de energía, y desarrollar proyectos de energías renovables y sostenibilidad ambiental.',
      info: ['3 años de duración', 'Modalidad Presencial', 'Turno Mañana/Tarde'],
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
    }
  ];

  private materiasSistemas = new Map<number, Materia[]>([
    [1, [
      { nombre: 'Matemática I', horas: 120 },
      { nombre: 'Física General', horas: 120 },
      { nombre: 'Programación I', horas: 160 },
      { nombre: 'Electrónica Digital', horas: 160 }
    ]],
    [2, [
      { nombre: 'Programación II', horas: 160 },
      { nombre: 'Microcontroladores', horas: 160 },
      { nombre: 'Comunicaciones Digitales', horas: 120 },
      { nombre: 'Sistemas Operativos', horas: 120 }
    ]],
    [3, [
      { nombre: 'IoT y Cloud Computing', horas: 160 },
      { nombre: 'Desarrollo de Proyectos', horas: 160 },
      { nombre: 'Seguridad en Sistemas Embebidos', horas: 120 },
      { nombre: 'Práctica Profesional', horas: 200 }
    ]]
  ]);

  private materiasEficiencia = new Map<number, Materia[]>([
    [1, [
      { nombre: 'Matemática I', horas: 120 },
      { nombre: 'Física Aplicada', horas: 120 },
      { nombre: 'Energías Convencionales', horas: 160 },
      { nombre: 'Dibujo Técnico', horas: 120 }
    ]],
    [2, [
      { nombre: 'Termodinámica', horas: 120 },
      { nombre: 'Energías Renovables', horas: 160 },
      { nombre: 'Auditorías Energéticas', horas: 160 },
      { nombre: 'Instalaciones Eléctricas', horas: 120 }
    ]],
    [3, [
      { nombre: 'Gestión de Proyectos Energéticos', horas: 160 },
      { nombre: 'Eficiencia en Edificios', horas: 160 },
      { nombre: 'Normativas y Certificaciones', horas: 120 },
      { nombre: 'Práctica Profesional', horas: 200 }
    ]]
  ]);

  ngOnInit(): void {
    const acordeonesIniciales = new Map<string, boolean[]>();
    this.carreras.forEach(carrera => {
      acordeonesIniciales.set(carrera.id, [false, false, false]);
    });
    this.acordeonesAbiertos.set(acordeonesIniciales);
  }

  cambiarPestania(pestania: string): void {
    this.pestaniaActiva.set(pestania);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleAcordeon(carreraId: string, index: number): void {
    const acordeonesActuales = new Map(this.acordeonesAbiertos());
    const estadosCarrera = [...(acordeonesActuales.get(carreraId) || [])];
    estadosCarrera[index] = !estadosCarrera[index];
    acordeonesActuales.set(carreraId, estadosCarrera);
    this.acordeonesAbiertos.set(acordeonesActuales);
  }

  esAcordeonAbierto(carreraId: string, index: number): boolean {
    const estados = this.acordeonesAbiertos().get(carreraId);
    return estados ? estados[index] : false;
  }

  obtenerCarreraDetalle(id: string): Carrera | undefined {
    return this.carreras.find(c => c.id === id);
  }

  obtenerMaterias(carreraId: string, anio: number): Materia[] {
    if (carreraId === 'sistemas') {
      return this.materiasSistemas.get(anio) || [];
    } else if (carreraId === 'eficiencia') {
      return this.materiasEficiencia.get(anio) || [];
    }
    return [];
  }

  descargarPDF(carreraId: string): void {
    const pdfUrls: { [key: string]: string } = {
      'sistemas': '/assets/Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas.pdf',
      'eficiencia': '/assets/Tecnicatura Superior en Eficiencia Energética.pdf'
    };

    const url = pdfUrls[carreraId];
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.download = url.split('/').pop() || 'programa-estudio.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error(`No se encontró PDF para la carrera: ${carreraId}`);
    }
  }
}
