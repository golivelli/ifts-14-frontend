import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorariosService, Horario } from '../../services/horarios.service';
import { PrimaryButton } from '../../components/globals/primary-button/primary-button';

@Component({
    selector: 'app-horarios',
    standalone: true,
    imports: [CommonModule, FormsModule, PrimaryButton],
    templateUrl: './horarios.html',
    styleUrl: './horarios.css'
})
export class HorariosComponent implements OnInit {
    private horariosService = inject(HorariosService);

    horarios: Horario[] = [];
    filteredHorarios: Horario[] = [];
    loading = true;
    error = '';

    // Filtros
    filterCarrera = '';
    filterAnio = '';
    filterDia = '';

    // Formulario
    showForm = false;
    currentHorario: Horario = this.getEmptyHorario();
    isEditing = false;

    ngOnInit() {
        this.loadHorarios();
    }

    loadHorarios() {
        this.loading = true;
        this.horariosService.getHorarios().subscribe({
            next: (data) => {
                this.horarios = data;
                this.filteredHorarios = data;
                this.loading = false;
                this.applyFilters();
            },
            error: (err) => {
                console.error('Error loading horarios', err);
                this.error = 'Error al cargar los horarios.';
                this.loading = false;
            }
        });
    }

    applyFilters() {
        this.filteredHorarios = this.horarios.filter(h => {
            const matchCarrera = !this.filterCarrera || h.carrera === this.filterCarrera;
            const matchAnio = !this.filterAnio || h.anio_division.includes(this.filterAnio + '°');
            const matchDia = !this.filterDia || h.dia === this.filterDia;
            return matchCarrera && matchAnio && matchDia;
        });
    }

    clearFilters() {
        this.filterCarrera = '';
        this.filterAnio = '';
        this.filterDia = '';
        this.applyFilters();
    }

    getEmptyHorario(): Horario {
        return {
            carrera: '',
            anio_division: '',
            materia: '',
            dia: '',
            horario: '',
            profesor: ''
        };
    }

    openCreateForm() {
        this.currentHorario = this.getEmptyHorario();
        this.isEditing = false;
        this.showForm = true;
    }

    openEditForm(horario: Horario) {
        this.currentHorario = { ...horario };
        this.isEditing = true;
        this.showForm = true;
    }

    cancelForm() {
        this.showForm = false;
        this.currentHorario = this.getEmptyHorario();
    }

    saveHorario() {
        if (this.isEditing) {
            this.horariosService.updateHorario(this.currentHorario).subscribe({
                next: () => {
                    this.loadHorarios();
                    this.showForm = false;
                    alert('Horario actualizado');
                },
                error: (err) => {
                    console.error('Error updating horario', err);
                    alert('Error al actualizar el horario');
                }
            });
        } else {
            this.horariosService.createHorario(this.currentHorario).subscribe({
                next: () => {
                    this.loadHorarios();
                    this.showForm = false;
                    alert('Horario creado correctamente');
                },
                error: (err) => {
                    console.error('Error creating horario', err);
                    alert('Error al crear el horario');
                }
            });
        }
    }

    deleteHorario(id: number | undefined) {
        if (!id) return;
        if (confirm('¿Seguro que querés eliminar este horario?')) {
            this.horariosService.deleteHorario(id).subscribe({
                next: () => {
                    this.loadHorarios();
                    alert('Horario eliminado');
                },
                error: (err) => {
                    console.error('Error deleting horario', err);
                    alert('Error al eliminar el horario');
                }
            });
        }
    }
}
