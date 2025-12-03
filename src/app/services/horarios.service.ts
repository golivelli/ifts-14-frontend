import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
    id?: number;
    carrera: string;       // Nombre de la carrera
    anio_division: string; // "1° Año - 1° División"
    materia: string;
    dia: string;
    horario: string;       // "18:00 - 22:15"
    profesor: string;
    aula?: string;
}

@Injectable({
    providedIn: 'root'
})
export class HorariosService {
    private http = inject(HttpClient);

    // URL de la API - cambiar según entorno
    private apiUrl = 'https://www.ifts14.com.ar/api/horarios';

    /**
     * Obtener todos los horarios
     * @param carrera Filtrar por carrera (opcional)
     */
    getHorarios(carrera?: string): Observable<Horario[]> {
        const url = carrera ? `${this.apiUrl}/?carrera=${carrera}` : `${this.apiUrl}/`;
        return this.http.get<Horario[]>(url);
    }

    /**
     * Crear nuevo horario
     */
    createHorario(horario: Horario): Observable<any> {
        return this.http.post(`${this.apiUrl}/create.php`, horario);
    }

    /**
     * Actualizar horario existente
     */
    updateHorario(horario: Horario): Observable<any> {
        return this.http.put(`${this.apiUrl}/update.php`, horario);
    }

    /**
     * Eliminar horario
     */
    deleteHorario(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/delete.php?id=${id}`);
    }
}
