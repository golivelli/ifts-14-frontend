import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Horario {
    id?: number;
    carrera: 'sistemas' | 'eficiencia';
    anio: string;
    materia: string;
    dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
    horario: string;
    profesor?: string;
    aula?: string;
}

@Injectable({
    providedIn: 'root'
})
export class HorariosService {
    private http = inject(HttpClient);

    // URL de la API - cambiar según entorno
    private apiUrl = 'https://tudominio.com/api/horarios'; // TODO: Cambiar por tu dominio

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
