import { Component } from '@angular/core';

@Component({
  selector: 'app-procedures-and-certifications',
  imports: [],
  templateUrl: './procedures-and-certifications.html',
  styleUrl: './procedures-and-certifications.css',
})
export class ProceduresAndCertifications {
  open = false;

  constancias = [
    {
      titulo: 'Exámenes',
      items: [
        { titulo: 'Exámenes', desc: 'Materias aprobadas y a rendir', archivo: 'constancia-examenes' }
      ]
    },
    {
    titulo: 'Eficiencia energética',
    items: [
      { titulo: 'Alumno regular', desc: 'Certificado de regularidad', archivo: 'regularidad-eficiencia.pdf' },
      { titulo: 'Inscripciones', desc: 'Certificado de inscripciones', archivo: 'inscripciones-eficiencia.pdf' }
    ]
  },
  {
    titulo: 'Sistemas embebidos',
    items: [
      { titulo: 'Alumno regular', desc: 'Certificado de regularidad', archivo: 'regularidad-embebidos.pdf' },
      { titulo: 'Inscripciones', desc: 'Certificado de inscripciones', archivo: 'inscripciones-embebidos.pdf' }
    ]
  }
  ];

  toggle() {
    this.open = !this.open;
  }

  descargar(tipo: string) {
    const urls: any = {
      'constancia-examenes': '/assets/pdf/constancia-examen.pdf',
      
      'constancia-alumno-regular-eficiencia-energetica': '/assets/pdf/constancia-alumno-regular-eficiencia-energetica.pdf',
      'constancia-alumno-regular-sistemas-embebidos': '/assets/pdf/constancia-regular-sistemas-embebidos.pdf',
      
      'constancia-inscripcion-eficiencia-energetica': '/assets/pdf/constancia-inscripcion-eficiencia-energetica.pdf',
      'constancia-inscripcion-sistemas-embebidos': '/assets/pdf/constancia-inscripcion-sistemas-embebidos.pdf'
    };

    const url = urls[tipo];
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  }
}
