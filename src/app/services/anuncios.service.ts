import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Novedad } from '../models/novedad';
import { environment } from '@/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnunciosService {

    private http = inject(HttpClient);

    // API BASE (sin barra al final)
    private apiUrl = environment.anunciosApi;

    private jsonHeaders = new HttpHeaders({
        'Content-Type': 'application/json'
    });

    /**
     * Obtener listado de anuncios
     */
    getAnuncios(filtros?: any): Observable<Novedad[]> {
        let params = new HttpParams();

        if (filtros) {
            Object.keys(filtros).forEach(key => {
                const value = filtros[key];
                if (value !== null && value !== undefined && value !== '') {
                    params = params.set(key, value);
                }
            });
        }

        // 🔥 FIX: Apuntar SIEMPRE a index.php (evita error 500 y activa CORS)
        return this.http.get<Novedad[]>(`${this.apiUrl}/index.php`, { params }).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Obtener un anuncio
     */
    getAnuncio(id: number): Observable<Novedad> {
        return this.http.get<Novedad>(`${this.apiUrl}/get.php?id=${id}`).pipe(
            catchError(this.handleError)
        );
    }

    /**
     * Crear anuncio
     */
    crearAnuncio(data: Partial<Novedad>): Observable<any> {
        return this.http.post(`${this.apiUrl}/create.php`, data, {
            headers: this.jsonHeaders
        }).pipe(catchError(this.handleError));
    }

    /**
     * Actualizar anuncio
     */
    actualizarAnuncio(id: number, data: Partial<Novedad>): Observable<any> {
        return this.http.put(`${this.apiUrl}/update.php`, { id, ...data }, {
            headers: this.jsonHeaders
        }).pipe(catchError(this.handleError));
    }

    /**
     * Eliminar anuncio
     */
    eliminarAnuncio(id: number): Observable<any> {
        return this.http.request('delete', `${this.apiUrl}/delete.php`, {
            headers: this.jsonHeaders,
            body: { id }
        }).pipe(catchError(this.handleError));
    }

    /**
     * Toggle destacado
     */
    toggleDestacado(id: number, valor: number): Observable<any> {
        return this.actualizarAnuncio(id, { destacado: valor });
    }

    /**
     * Publicar anuncio
     */
    publicarAnuncio(id: number): Observable<any> {
        return this.actualizarAnuncio(id, { estado: 'publicado' });
    }

    /**
     * Manejo global de errores
     */
    private handleError(error: any) {
        console.error('Error API:', error);
        return throwError(() => error?.error || 'Error en la comunicación con el servidor');
    }
}
