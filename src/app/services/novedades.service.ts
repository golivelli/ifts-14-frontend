import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Novedad {
  id?: number;
  id_carrera?: number | null;
  titulo: string;
  contenido: string;  // CAMBIADO: de 'descripcion' a 'contenido'
  imagen_url?: string | null;
  fecha_publicacion?: string;
  fecha_modificacion?: string;
  estado: 'borrador' | 'publicado' | 'archivado';
  autor: string;  // CAMBIADO: de 'creadoPor' a 'autor'
  destacado: number;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {
  private http = inject(HttpClient);
  // CORREGIDO: El path debe coincidir con tu estructura de carpetas en cPanel
  private apiUrl = 'https://www.ifts14.com.ar/api/novedades';

  // ⭐ PARA LISTAR TODAS LAS NOVEDADES
  getAll(): Observable<Novedad[]> {
    return this.http.get<Novedad[]>(`${this.apiUrl}/list.php`);
  }

  // ⭐ PARA OBTENER UNA NOVEDAD
  get(id: number): Observable<Novedad> {
    return this.http.get<Novedad>(`${this.apiUrl}/get.php?id=${id}`);
  }

  // ⭐ PARA CREAR - IMPORTANTE: Cambiado a FormData
  create(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create.php`, formData);
  }

  // ⭐ PARA ACTUALIZAR - IMPORTANTE: Cambiado a FormData
  update(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/update.php`, formData);
  }

  // ⭐ PARA ELIMINAR
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
  }
}