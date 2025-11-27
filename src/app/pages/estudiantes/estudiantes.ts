import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Horario {
  materia: string;
  dia: string;
  horario: string;
  profesor: string;
}

interface HorariosMap {
  [key: string]: Horario[];
}

@Component({
  selector: 'app-estudiantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estudiantes.html',
  styleUrl: './estudiantes.css'
})
export class EstudiantesComponent {
  seccionActiva = signal<string>('horarios');
  carreraSeleccionada = signal<string>('');

  toggleSeccion(seccion: string): void {
    if (this.seccionActiva() === seccion) {
      this.seccionActiva.set('');
    } else {
      this.seccionActiva.set(seccion);
    }
  }

  cambiarCarrera(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.carreraSeleccionada.set(select.value);
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

  // Datos completos de horarios 2° Cuatrimestre 2025 - Sistemas Embebidos IoT
  getHorariosSistemas(): HorariosMap {
    return {
      '1° Año - 1° División': [
        { materia: 'Desarrollo de Sistemas Web', dia: 'Lunes', horario: '18:00 - 22:15', profesor: 'Belaunde, Victor Manuel' },
        { materia: 'Circuitos Eléctricos y Electrónicos', dia: 'Martes', horario: '18:00 - 22:15', profesor: 'Bertani, Jorge' },
        { materia: 'Técnicas de Programación', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Tejerina, Sandra' },
        { materia: 'Electrónica Digital y Microprocesadores', dia: 'Jueves', horario: '18:00 - 22:15', profesor: 'Belaunde, V. / Bertani, J.' },
        { materia: 'Desarrollo de Sistemas Web', dia: 'Viernes', horario: '18:00 - 20:00', profesor: 'Belaunde, Victor Manuel' },
        { materia: 'Técnicas de Programación', dia: 'Viernes', horario: '20:15 - 22:15', profesor: 'Bertani, Jorge' }
      ],
      '1° Año - 2° División': [
        { materia: 'Desarrollo y Testing de Software SE', dia: 'Lunes', horario: '18:00 - 22:15', profesor: 'Velárdez, Germán' },
        { materia: 'Protocolos de IoT', dia: 'Martes', horario: '18:00 - 22:15', profesor: 'Granzella, Damián Eduardo' },
        { materia: 'Programación y Comunicación en SE', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Alonso Castillo, Pablo' },
        { materia: 'Administración de Base de Datos', dia: 'Jueves', horario: '18:00 - 22:15', profesor: 'Belaunde, Víctor Manuel' },
        { materia: 'Administración de Base de Datos', dia: 'Viernes', horario: '20:15 - 22:15', profesor: 'Belaunde, Víctor Manuel' }
      ],
      '2° Año': [
        { materia: 'Sistemas Operativos en Tiempo Real', dia: 'Martes', horario: '18:00 - 22:15', profesor: 'Gómez Molino, Hernán' },
        { materia: 'Ciberseguridad en IoT', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Prieto, Gustavo' },
        { materia: 'Desarrollo de Aplicaciones Vinculadas a Base de Datos', dia: 'Viernes', horario: '18:00 - 22:15', profesor: 'Petroff, Maximiliano' }
      ],
      '3° Año': [
        { materia: 'Procesamiento de Aprendizaje Automático', dia: 'Lunes', horario: '18:00 - 22:15', profesor: 'Iaria, Pablo' },
        { materia: 'Proyecto Integrador', dia: 'Martes', horario: '18:00 - 22:15', profesor: 'Alonso Castillo, Pablo' },
        { materia: 'Procesamiento de Aprendizaje Automático', dia: 'Miércoles', horario: '18:00 - 20:00', profesor: 'Iaria, Pablo' },
        { materia: 'Modelizado y Minería de Datos', dia: 'Miércoles', horario: '20:15 - 22:15', profesor: 'Rodríguez, Daniel F.' },
        { materia: 'Proyecto Integrador', dia: 'Jueves', horario: '18:40 - 20:55', profesor: 'Alonso Castillo, Pablo' },
        { materia: 'Modelizado y Minería de Datos', dia: 'Viernes', horario: '18:00 - 22:15', profesor: 'Rodríguez, Daniel F.' }
      ]
    };
  }

  // Datos completos de horarios 2° Cuatrimestre 2025 - Eficiencia Energética
  getHorariosEficiencia(): HorariosMap {
    return {
      '1° Año': [
        { materia: 'Física', dia: 'Lunes', horario: '18:00 - 20:55', profesor: 'Alonso Castillo, Pablo' },
        { materia: 'Prácticas Profesionalizantes I', dia: 'Martes', horario: '18:40 - 22:15', profesor: 'Gómez Riera, Germán' },
        { materia: 'Representación Gráfica Específica', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Gallardo, Lucia' },
        { materia: 'Fuentes de Energía', dia: 'Jueves', horario: '18:00 - 22:15', profesor: 'Schvartz, Sebastian' },
        { materia: 'Álgebra Lineal', dia: 'Viernes', horario: '18:00 - 21:35', profesor: 'Alonso Castillo, Pablo' }
      ],
      '2° Año': [
        { materia: 'Evaluación Energética de Edificios', dia: 'Lunes', horario: '18:00 - 22:15', profesor: 'Schvartz, Sebastian' },
        { materia: 'Prácticas Profesionalizantes II', dia: 'Martes', horario: '18:00 - 20:55', profesor: 'Pillon, Fernando' },
        { materia: 'Sistemas de Climatización', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Pons, Flavio' },
        { materia: 'Instalaciones Eléctricas', dia: 'Jueves', horario: '18:00 - 22:15', profesor: 'Gagliardi, Adrián' },
        { materia: 'Problemáticas Socio Económicas de la Energía', dia: 'Viernes', horario: '18:00 - 20:55', profesor: 'López, C. Guillermo' }
      ],
      '3° Año': [
        { materia: 'Instalaciones Industriales', dia: 'Lunes', horario: '18:00 - 22:15', profesor: 'Fuentes, Carlos A.' },
        { materia: 'Inglés Técnico', dia: 'Martes', horario: '18:40 - 20:55', profesor: 'Schvartz, Sebastian' },
        { materia: 'Instalaciones Aplicadas a Energías Renovables', dia: 'Miércoles', horario: '18:00 - 22:15', profesor: 'Fuentes, C. / Pons, F. / Schvartz, S.' },
        { materia: 'Gestión Energética', dia: 'Jueves', horario: '18:40 - 22:15', profesor: 'Pons, Flavio' },
        { materia: 'Prácticas Profesionalizantes III', dia: 'Viernes', horario: '18:00 - 22:15', profesor: 'Fuentes, Carlos A.' }
      ]
    };
  }

  getHorariosActuales(): HorariosMap {
    if (this.carreraSeleccionada() === 'sistemas') {
      return this.getHorariosSistemas();
    } else if (this.carreraSeleccionada() === 'eficiencia') {
      return this.getHorariosEficiencia();
    }
    return {};
  }

  getAniosUnicos() {
    const horarios = this.getHorariosActuales();
    return Object.keys(horarios);
  }

  getHorariosPorAnio(anio: string): Horario[] {
    const horarios = this.getHorariosActuales();
    return horarios[anio] || [];
  }
}
