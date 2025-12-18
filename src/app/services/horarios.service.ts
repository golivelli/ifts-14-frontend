import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

export interface Horario {
    id?: number;
    carrera: string;       // Nombre de la carrera
    anio_division: string;          // "1° Año - 1° División"
    materia: string;
    dia: string;
    horario: string;       // "18:00 - 22:15"
    profesor: string;
}

@Injectable({
    providedIn: 'root'
})
export class HorariosService {
    private http = inject(HttpClient);

    // URL de la API - cambiar según entorno
    private apiUrl = environment.horariosApi;

    /**
     * Obtener todos los horarios
     * @param carrera Filtrar por carrera (opcional)
     */
    getHorarios(carrera?: string): Observable<Horario[]> {
        const url = carrera ? `${this.apiUrl}/?carrera=${carrera}` : `${this.apiUrl}/`;
        return this.http.get<Horario[]>(url);
    }

    /**
     * Transformar datos del frontend al formato esperado por el backend
     */
    private transformToBackend(horario: Horario): any {
        return {
            ...horario,
            anio: horario.anio_division, // Backend espera 'anio'
            anio_division: undefined // Eliminar campo del frontend
        };
    }

    /**
     * Crear nueva materia
     */
    createHorario(horario: Horario): Observable<any> {
        const backendData = this.transformToBackend(horario);
        return this.http.post(`${this.apiUrl}/create.php`, backendData);
    }

    /**
     * Actualizar horario existente
     */
    updateHorario(horario: Horario): Observable<any> {
        const backendData = this.transformToBackend(horario);
        return this.http.put(`${this.apiUrl}/update.php`, backendData);
    }

    /**
     * Eliminar horario
     */
    deleteHorario(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
    }
}
