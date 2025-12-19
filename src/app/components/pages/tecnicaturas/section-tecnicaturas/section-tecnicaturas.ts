import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-section-tecnicaturas',
  standalone: true,
  imports: [],
  templateUrl: './section-tecnicaturas.html',
  styleUrls: ['./section-tecnicaturas.css'],
})
export class SectionTecnicaturas {
  pestaniaActiva = signal<string>('todas');

  constructor(private router: Router) {}

  carreras: Carrera[] = [
    {
      id: 'sistemas',
      icon: 'assets/icons/iconSistemasEmbebidos.png',
      nombreCorto: 'Sistemas embebidos e internet de las cosas',
      nombreCompleto: 'Tecnicatura superior en sistemas embebidos e internet de las cosas',
      descripcion: 'Formación en desarrollo de sistemas inteligentes conectados y aplicaciones IoT. Programación de microcontroladores, electrónica digital y comunicaciones.',
      descripcionCompleta:
        'La Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas forma profesionales capacitados para diseñar, desarrollar e implementar sistemas inteligentes conectados. Los estudiantes adquieren competencias en programación de microcontroladores, desarrollo de aplicaciones IoT, electrónica digital y comunicaciones inalámbricas.',
      info: ['3 años de duración', 'Modalidad Presencial', 'Turno Tarde/Noche'],
      informacion: [
        { titulo: 'Duración', valor: '3 años', icono: 'duration' },
        { titulo: 'Modalidad', valor: 'Presencial', icono: 'modality' },
        { titulo: 'Turno', valor: 'Tarde/Noche', icono: 'schedule' },
        { titulo: 'Sede', valor: 'IFTS N.° 14 - Cochabamba 2830 (CABA)', icono: 'location' }
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
      icon: 'assets/icons/iconEficienciaEnergetica.png',
      nombreCorto: 'Eficiencia energética',
      nombreCompleto: 'Tecnicatura superior en eficiencia energética',
      descripcion: 'Especialización en optimización energética y sostenibilidad ambiental. Auditorías energéticas y proyectos de energías renovables.',
      descripcionCompleta:
        'La Tecnicatura Superior en Eficiencia Energética forma técnicos capaces de optimizar el consumo energético en diversos sectores. Los estudiantes aprenden a realizar auditorías energéticas, implementar sistemas de gestión de energía, y desarrollar proyectos de energías renovables y sostenibilidad ambiental.',
      info: ['3 años de duración', 'Modalidad Presencial', 'Turno Mañana/Tarde'],
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
    }
  ];

  irADetalle(id: string) {
    const rutas: Record<string, string> = {
      sistemas: '/tecnicaturas/sistemas-embebidos',
      eficiencia: '/tecnicaturas/eficiencia-energetica'
    };

    this.router.navigate([rutas[id]]);
  }

  descargarPDF(carreraId: string): void {
    const pdfUrls: { [key: string]: string } = {
      sistemas: '/assets/pdf/plan-estudio-sistemas.pdf',
      eficiencia: '/assets/pdf/plan-estudio-eficiencia.pdf'
    };

    const url = pdfUrls[carreraId];
    if (!url) return;

    const link = document.createElement('a');
    link.href = encodeURI(url);
    link.download = url.split('/').pop() || 'plan-estudios.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}



