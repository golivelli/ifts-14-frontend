import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Anuncio {
    id?: number;
    titulo: string;
    contenido: string;
    imagen_url?: string;
    estado: 'borrador' | 'publicado' | 'archivado';
    destacado: number; // 0 o 1
    autor?: string;
    fecha_publicacion?: string;
    fecha_modificacion?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AnunciosService {
    private http = inject(HttpClient);

    // URL de la API - cambiar según entorno
    // Desarrollo: usar la URL de cPanel directamente
    // Producción: usar ruta relativa '/api'
    private apiUrl = 'https://www.ifts14.com.ar/api/anuncios';

    /**
     * Obtener todos los anuncios
     * @param estado Filtrar por estado (opcional)
     */
    getAnuncios(estado?: string): Observable<Anuncio[]> {
        const url = estado ? `${this.apiUrl}/?estado=${estado}` : `${this.apiUrl}/`;
        return this.http.get<Anuncio[]>(url);
    }

    /**
     * Obtener un anuncio específico por ID
     */
    getAnuncio(id: number): Observable<Anuncio> {
        return this.http.get<Anuncio>(`${this.apiUrl}/get.php?id=${id}`);
    }

    /**
     * Crear nuevo anuncio
     */
    createAnuncio(anuncio: Anuncio): Observable<any> {
        return this.http.post(`${this.apiUrl}/create.php`, anuncio);
    }

    /**
     * Actualizar anuncio existente
     */
    updateAnuncio(anuncio: Anuncio): Observable<any> {
        return this.http.put(`${this.apiUrl}/update.php`, anuncio);
    }

    /**
     * Eliminar anuncio
     */
    deleteAnuncio(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
    }

    /**
     * Cambiar estado de destacado
     */
    toggleDestacado(id: number, destacado: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/update.php`, { id, destacado });
    }

    /**
     * Publicar un anuncio (cambiar estado a publicado)
     */
    publicarAnuncio(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/update.php`, { id, estado: 'publicado' });
    }
}
