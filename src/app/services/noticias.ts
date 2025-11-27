import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

// Interface basada en la tabla 'posts' de la BD real en cPanel
export interface Noticia {
  id: number;
  tipo: 'novedad' | 'noticia';
  titulo: string;
  descripcion: string;
  fecha: string; // Date string YYYY-MM-DD
  termina?: string; // DateTime string para eventos
  tecnicatura_id: number;
  status: 'borrador' | 'publicado';
  file_path?: string;
  creado_en: string;
  actualizado_en: string;
  // Campos populados via JOIN
  tecnicatura?: {
    id: number;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  // URL del API - Backend en producción
  private apiUrl = 'https://ifts14.com.ar/api/posts';

  // Para desarrollo, usar datos mock
  private useMock = true; // Cambiar a false cuando el backend esté listo

  // Datos mock basados en la estructura real de cPanel
  private noticiasMock: Noticia[] = [
    {
      id: 1,
      tipo: 'novedad',
      titulo: 'Inicio de Inscripciones 2025',
      descripcion: 'Ya están abiertas las inscripciones para el ciclo lectivo 2025. No te pierdas la oportunidad de formarte en nuestras tecnicaturas.',
      fecha: '2025-01-15',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-10T10:00:00',
      actualizado_en: '2025-01-10T10:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    },
    {
      id: 2,
      tipo: 'novedad',
      titulo: 'Charla Informativa: Sistemas Embebidos e IoT',
      descripcion: 'Te invitamos a participar de una charla informativa sobre la Tecnicatura en Sistemas Embebidos e Internet de las Cosas. Conoce el plan de estudios y las salidas laborales.',
      fecha: '2025-02-01',
      termina: '2025-02-01T18:00:00',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-20T09:00:00',
      actualizado_en: '2025-01-20T09:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    },
    {
      id: 3,
      tipo: 'novedad',
      titulo: 'Jornada de Eficiencia Energética',
      descripcion: 'Charla sobre buenas prácticas de eficiencia en edificios públicos. Presentación de proyectos de estudiantes.',
      fecha: '2025-01-20',
      termina: '2025-01-20T17:00:00',
      tecnicatura_id: 2,
      status: 'publicado',
      file_path: 'uploads/jornada-eficiencia.pdf',
      creado_en: '2025-01-15T11:00:00',
      actualizado_en: '2025-01-15T11:00:00',
      tecnicatura: {
        id: 2,
        nombre: 'Tecnicatura Superior en Eficiencia Energética'
      }
    },
    {
      id: 4,
      tipo: 'noticia',
      titulo: 'Convenio con Empresas del Sector Tecnológico',
      descripcion: 'El IFTS N°14 firmó convenios con importantes empresas del sector tecnológico para facilitar prácticas profesionales y pasantías para nuestros estudiantes.',
      fecha: '2025-01-10',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-08T14:00:00',
      actualizado_en: '2025-01-08T14:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    }
  ];

  constructor(private http: HttpClient) { }

  // ============================================
  // MÉTODOS PRINCIPALES
  // ============================================

  /**
   * Obtener todas las noticias/novedades
   */
  getNoticias(): Observable<Noticia[]> {
    if (this.useMock) {
      return of(this.noticiasMock);
    }
    return this.http.get<Noticia[]>(this.apiUrl);
  }

  /**
   * Obtener solo noticias publicadas
   */
  getNoticiasPublicadas(): Observable<Noticia[]> {
    if (this.useMock) {
      return of(this.noticiasMock.filter(n => n.status === 'publicado'));
    }
    return this.http.get<Noticia[]>(`${this.apiUrl}?status=publicado`);
  }

  /**
   * Obtener noticia por ID
   */
  getNoticiaById(id: string | number): Observable<Noticia | undefined> {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (this.useMock) {
      const noticia = this.noticiasMock.find(n => n.id === numId);
      return of(noticia);
    }
    return this.http.get<Noticia>(`${this.apiUrl}/${numId}`);
  }

  /**
   * Filtrar por tipo (novedad o noticia)
   */
  getNoticiasPorTipo(tipo: 'novedad' | 'noticia'): Observable<Noticia[]> {
    if (this.useMock) {
      return of(this.noticiasMock.filter(n => n.tipo === tipo && n.status === 'publicado'));
    }
    return this.http.get<Noticia[]>(`${this.apiUrl}?tipo=${tipo}&status=publicado`);
  }

  /**
   * Filtrar por tecnicatura
   */
  getNoticiasPorTecnicatura(tecnicaturaId: number): Observable<Noticia[]> {
    if (this.useMock) {
      return of(this.noticiasMock.filter(n => n.tecnicatura_id === tecnicaturaId && n.status === 'publicado'));
    }
    return this.http.get<Noticia[]>(`${this.apiUrl}?tecnicatura_id=${tecnicaturaId}&status=publicado`);
  }

  // ============================================
  // MÉTODOS CRUD (Para panel admin)
  // ============================================

  /**
   * Crear nueva noticia
   */
  crearNoticia(noticia: Partial<Noticia>): Observable<Noticia> {
    if (this.useMock) {
      const nuevaNoticia: Noticia = {
        id: this.noticiasMock.length + 1,
        tipo: noticia.tipo || 'novedad',
        titulo: noticia.titulo || '',
        descripcion: noticia.descripcion || '',
        fecha: noticia.fecha || new Date().toISOString().split('T')[0],
        tecnicatura_id: noticia.tecnicatura_id || 1,
        status: noticia.status || 'borrador',
        creado_en: new Date().toISOString(),
        actualizado_en: new Date().toISOString()
      };
      this.noticiasMock.push(nuevaNoticia);
      return of(nuevaNoticia);
    }
    return this.http.post<Noticia>(this.apiUrl, noticia);
  }

  /**
   * Guardar como borrador
   */
  guardarBorrador(noticia: Partial<Noticia>): Observable<Noticia> {
    const borrador = { ...noticia, status: 'borrador' as const };
    return this.crearNoticia(borrador);
  }

  /**
   * Actualizar noticia existente
   */
  actualizarNoticia(id: number, noticia: Partial<Noticia>): Observable<Noticia> {
    if (this.useMock) {
      const index = this.noticiasMock.findIndex(n => n.id === id);
      if (index !== -1) {
        this.noticiasMock[index] = {
          ...this.noticiasMock[index],
          ...noticia,
          actualizado_en: new Date().toISOString()
        };
        return of(this.noticiasMock[index]);
      }
      throw new Error('Noticia no encontrada');
    }
    return this.http.put<Noticia>(`${this.apiUrl}/${id}`, noticia);
  }

  /**
   * Eliminar noticia
   */
  eliminarNoticia(id: number): Observable<void> {
    if (this.useMock) {
      const index = this.noticiasMock.findIndex(n => n.id === id);
      if (index !== -1) {
        this.noticiasMock.splice(index, 1);
      }
      return of(void 0);
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Formatear fecha para mostrar
   */
  formatearFecha(fecha: string): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Verificar si una noticia es un evento (tiene fecha de término)
   */
  esEvento(noticia: Noticia): boolean {
    return !!noticia.termina;
  }

  /**
   * Verificar si un evento ya pasó
   */
  eventoPasado(noticia: Noticia): boolean {
    if (!noticia.termina) return false;
    return new Date(noticia.termina) < new Date();
  }

  /**
   * Obtener nombre de tecnicatura
   */
  getNombreTecnicatura(tecnicaturaId: number): string {
    const nombres: { [key: number]: string } = {
      1: 'Sistemas Embebidos e IoT',
      2: 'Eficiencia Energética'
    };
    return nombres[tecnicaturaId] || 'General';
  }
}
