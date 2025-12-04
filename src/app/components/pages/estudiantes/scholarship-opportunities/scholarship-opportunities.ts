import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-scholarship-opportunities',
  imports: [MatExpansionModule, MatDividerModule],
  templateUrl: './scholarship-opportunities.html',
  styleUrl: './scholarship-opportunities.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScholarshipOpportunities {
  readonly panelOpenState = signal(false);

  open = false;
  openBecaProgresar = false;
  openBecaBelgrano = false;

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

  toggleBecaProgresar() {
    this.openBecaProgresar = !this.openBecaProgresar;
  }

  toggleBecaBelgrano() {
    this.openBecaBelgrano = !this.openBecaBelgrano;
  }

  descargar(tipo: string) {
    const urls: any = {
      'constancia-regular': '/assets/constancia-alumno-regular.pdf',
      'constancia-examenes': '/assets/constancia-examenes.pdf',
      'constancia-regular-eficiencia-energetica': '/assets/constancia-regular-eficiencia-energetica.pdf',
      'constancia-inscripcion-eficiencia-energetica': '/assets/constancia-inscripcion-eficiencia-energetica.pdf',
      'constancia-regular-sistemas-embebidos': '/assets/constancia-regular-sistemas-embebidos.pdf',
      'constancia-inscripcion-sistemas-embebidos': '/assets/constancia-inscripcion-sistemas-embebidos.pdf'
    };

    const url = urls[tipo];
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop();
    link.click();
  }
}
