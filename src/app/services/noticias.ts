import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@/environments/environment';
import { AnunciosService } from './anuncios.service';
import { Novedad } from '../models/novedad';

// Interface basada en la tabla 'posts' de la BD real en cPanel
export interface Noticia {
  id: number;
  tipo: 'novedad' | 'anuncio';
  titulo: string;
  descripcion: string;
  fecha: string; // Date string YYYY-MM-DD
  termina?: string; // DateTime string para eventos
  tecnicatura_id: number;
  status: 'borrador' | 'publicado';
  file_path?: string;
  creado_en: string;
  creado_por: string;
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
  // Toggle para usar mocks (se controla desde environment)
  private useMock = environment.useMockNoticias;

  // Datos mock basados en la estructura real de cPanel
  private noticiasMock: Noticia[] = [
    {
      id: 1,
      tipo: 'anuncio',
      titulo: 'Inicio de Inscripciones 2025',
      descripcion: 'Ya están abiertas las inscripciones para el ciclo lectivo 2025. No te pierdas la oportunidad de formarte en nuestras tecnicaturas.',
      fecha: '2025-01-15',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-10T10:00:00',
      creado_por: 'Geronimo Olivelli',
      actualizado_en: '2025-01-10T10:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    },
    {
      id: 2,
      tipo: 'anuncio',
      titulo: 'Charla Informativa: Sistemas Embebidos e IoT',
      descripcion: 'Te invitamos a participar de una charla informativa sobre la Tecnicatura en Sistemas Embebidos e Internet de las Cosas. Conoce el plan de estudios y las salidas laborales.',
      fecha: '2025-02-01',
      termina: '2025-02-01T18:00:00',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-20T09:00:00',
      creado_por: 'Mauricio Soto',
      actualizado_en: '2025-01-20T09:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    },
    {
      id: 3,
      tipo: 'anuncio',
      titulo: 'Jornada de Eficiencia Energética',
      descripcion: 'Charla sobre buenas prácticas de eficiencia en edificios públicos. Presentación de proyectos de estudiantes.',
      fecha: '2025-01-20',
      termina: '2025-01-20T17:00:00',
      tecnicatura_id: 2,
      status: 'publicado',
      file_path: 'uploads/jornada-eficiencia.pdf',
      creado_en: '2025-01-15T11:00:00',
      creado_por: 'Christian Acuña',
      actualizado_en: '2025-01-15T11:00:00',
      tecnicatura: {
        id: 2,
        nombre: 'Tecnicatura Superior en Eficiencia Energética'
      }
    },
    {
      id: 4,
      tipo: 'anuncio',
      titulo: 'Jornada de Sistemas Embebidos e IoT',
      descripcion: 'Presentación de proyectos de estudiantes.',
      fecha: '2025-01-20',
      termina: '2025-01-20T17:00:00',
      tecnicatura_id: 2,
      status: 'publicado',
      file_path: 'uploads/jornada-eficiencia.pdf',
      creado_en: '2025-01-15T11:00:00',
      creado_por: 'Christian Acuña',
      actualizado_en: '2025-01-15T11:00:00',
      tecnicatura: {
        id: 2,
        nombre: 'Tecnicatura Superior en Eficiencia Energética'
      }
    },
    {
      id: 5,
      tipo: 'novedad',
      titulo: 'Convenio con Empresas del Sector Tecnológico',
      descripcion: 'El IFTS N°14 firmó convenios con importantes empresas del sector tecnológico para facilitar prácticas profesionales y pasantías para nuestros estudiantes.',
      fecha: '2025-01-10',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-08T14:00:00',
      creado_por: 'Christian Acuña',
      actualizado_en: '2025-01-08T14:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    },
    {
      id: 6,
      tipo: 'novedad',
      titulo: 'Convenio con Empresas del Sector Tecnológico',
      descripcion: 'El IFTS N°14 firmó convenios con importantes empresas del sector tecnológico para facilitar prácticas profesionales y pasantías para nuestros estudiantes.',
      fecha: '2025-01-10',
      tecnicatura_id: 1,
      status: 'publicado',
      creado_en: '2025-01-08T14:00:00',
      creado_por: 'Christian Acuña',
      actualizado_en: '2025-01-08T14:00:00',
      tecnicatura: {
        id: 1,
        nombre: 'Tecnicatura Superior en Sistemas Embebidos e Internet de las Cosas'
      }
    }
  ];

  constructor(private anunciosService: AnunciosService) { }

  private fetchNoticias(): Observable<Noticia[]> {
    if (this.useMock) {
      return of(this.noticiasMock);
    }

    return this.anunciosService.getAnuncios().pipe(
      map(anuncios => anuncios
        .filter(a => !!a)
        .map(a => this.mapToNoticia(a))
      ),
      catchError(error => {
        console.error('Error al obtener noticias reales:', error);
        return of(this.noticiasMock);
      })
    );
  }

  private mapToNoticia(anuncio: Novedad): Noticia {
    const tipo: 'anuncio' | 'novedad' = anuncio.destacado === 1 ? 'anuncio' : 'novedad';
    return {
      id: anuncio.id,
      tipo,
      titulo: anuncio.titulo,
      descripcion: anuncio.contenido,
      fecha: anuncio.fecha_publicacion || anuncio.created_at || '',
      tecnicatura_id: anuncio.id_carrera ?? 0,
      status: anuncio.estado === 'archivado' ? 'borrador' : anuncio.estado,
      file_path: anuncio.imagen_url || undefined,
      creado_en: anuncio.created_at || anuncio.fecha_publicacion || '',
      creado_por: anuncio.autor || 'IFTS Nº 14',
      actualizado_en: anuncio.updated_at || anuncio.fecha_modificacion || anuncio.fecha_publicacion || ''
    };
  }

  private mapToAnuncioPayload(noticia: Partial<Noticia>): Partial<Novedad> {
    return {
      id: noticia.id,
      titulo: noticia.titulo || '',
      contenido: noticia.descripcion || '',
      estado: noticia.status || 'borrador',
      destacado: noticia.tipo === 'anuncio' ? 1 : 0,
      id_carrera: noticia.tecnicatura_id ?? null,
      imagen_url: noticia.file_path,
      fecha_publicacion: noticia.fecha
    };
  }

  // ============================================
  // MÉTODOS PRINCIPALES
  // ============================================

  /**
   * Obtener todas las noticias/novedades
   */
  getNoticias(): Observable<Noticia[]> {
    return this.fetchNoticias();
  }

  /**
   * Obtener solo noticias publicadas
   */
  getNoticiasPublicadas(): Observable<Noticia[]> {
    return this.fetchNoticias().pipe(
      map(noticias => noticias.filter(n => n.status === 'publicado'))
    );
  }

  /**
   * Obtener noticia por ID
   */
  getNoticiaById(id: string | number): Observable<Noticia | undefined> {
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;

    if (this.useMock) {
      return this.fetchNoticias().pipe(
        map(noticias => noticias.find(n => n.id === numId))
      );
    }

    return this.anunciosService.getAnuncio(numId).pipe(
      map(anuncio => this.mapToNoticia(anuncio)),
      catchError(() => of(undefined))
    );
  }

  /**
   * Filtrar por tipo (novedad o noticia)
   */
  getNoticiasPorTipo(tipo: 'novedad' | 'anuncio'): Observable<Noticia[]> {
    return this.getNoticiasPublicadas().pipe(
      map(noticias => noticias.filter(n => n.tipo === tipo))
    );
  }

  /**
   * Filtrar por tecnicatura
   */
  getNoticiasPorTecnicatura(tecnicaturaId: number): Observable<Noticia[]> {
    return this.getNoticiasPublicadas().pipe(
      map(noticias => noticias.filter(n => n.tecnicatura_id === tecnicaturaId))
    );
  }

  // ============================================
  // MÉTODOS CRUD (Para panel admin)
  // ============================================

  /**
   * Crear nueva noticia
   */
  crearNoticia(noticia: Partial<Noticia>): Observable<any> {
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
        creado_por: noticia.creado_por || 'IFTS N°. 14',
        actualizado_en: new Date().toISOString()
      };
      this.noticiasMock.push(nuevaNoticia);
      return of(nuevaNoticia);
    }
    return this.anunciosService.crearAnuncio(this.mapToAnuncioPayload(noticia));
  }

  /**
   * Guardar como borrador
   */
  guardarBorrador(noticia: Partial<Noticia>): Observable<any> {
    const borrador = { ...noticia, status: 'borrador' as const };
    return this.crearNoticia(borrador);
  }

  /**
   * Actualizar noticia existente
   */
  actualizarNoticia(id: number, noticia: Partial<Noticia>): Observable<any> {
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
    return this.anunciosService.actualizarAnuncio(id, this.mapToAnuncioPayload(noticia));
  }

  /**
   * Eliminar noticia
   */
  eliminarNoticia(id: number): Observable<any> {
    if (this.useMock) {
      const index = this.noticiasMock.findIndex(n => n.id === id);
      if (index !== -1) {
        this.noticiasMock.splice(index, 1);
      }
      return of(void 0);
    }
    return this.anunciosService.eliminarAnuncio(id);
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
