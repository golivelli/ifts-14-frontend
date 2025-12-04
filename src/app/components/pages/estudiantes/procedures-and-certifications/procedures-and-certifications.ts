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
      { titulo: 'Alumno regular', desc: 'Certificado de regularidad', archivo: 'constancia-alumno-regular-eficiencia-energetica' },
      { titulo: 'Inscripciones', desc: 'Certificado de inscripciones', archivo: 'constancia-inscripcion-eficiencia-energetica' }
    ]
  },
  {
    titulo: 'Sistemas embebidos',
    items: [
      { titulo: 'Alumno regular', desc: 'Certificado de regularidad', archivo: 'constancia-alumno-regular-sistemas-embebidos' },
      { titulo: 'Inscripciones', desc: 'Certificado de inscripciones', archivo: 'constancia-inscripcion-sistemas-embebidos' }
    ]
  }
  ];

  toggle() {
    this.open = !this.open;
  }

  descargar(tipo: string) {
  console.log('[descargar] tipo recibido ->', tipo);

  const urls: Record<string, string> = {
    'constancia-examenes': '/assets/pdf/constancia-examen.pdf',
    'constancia-alumno-regular-eficiencia-energetica': '/assets/pdf/constancia-alumno-regular-eficiencia-energetica.pdf',
    'constancia-alumno-regular-sistemas-embebidos': '/assets/pdf/constancia-alumno-regular-sistemas-embebidos.pdf',
    'constancia-inscripcion-eficiencia-energetica': '/assets/pdf/constancia-inscripcion-eficiencia-energetica.pdf',
    'constancia-inscripcion-sistemas-embebidos': '/assets/pdf/constancia-inscripcion-sistemas-embebidos.pdf'
  };

  const key = String(tipo).trim(); // protege contra null, undefined y espacios
  const url = urls[key];

  console.log('[descargar] key normalizada ->', key, 'url encontrada ->', url);

  if (!url) {
    console.warn('[descargar] No se encontró URL para el tipo:', key);
    return;
  }

  // Crear enlace de descarga de manera compatible
  const link = document.createElement('a');
  link.href = encodeURI(url);
  link.download = url.split('/').pop() || 'download.pdf';
  link.target = '_blank';
  // Algunos navegadores/políticas requieren que esté en el DOM
  document.body.appendChild(link);
  link.click();
  // limpieza
  document.body.removeChild(link);
}
}
