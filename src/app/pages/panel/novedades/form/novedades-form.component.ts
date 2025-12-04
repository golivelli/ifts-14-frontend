import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NovedadesService } from '../../../../services/novedades.service';


@Component({
  selector: 'app-novedad-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './novedades-form.component.html',
  styleUrls: ['./novedades-form.component.css']
})
export class NovedadFormComponent implements OnInit {

  esModoEdicion = false;
  idNovedad: string | null = null;
  archivo: File | null = null;

  formData = {
    id_carrera: '',
    titulo: '',
    contenido: '',
    estado: 'borrador',
    creadoPor: 'Coordinación',   // <---- tu nombre del campo
    destacado: 0,
    fecha_publicacion: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private novedadesService: NovedadesService
  ) {}

  ngOnInit() {
    this.idNovedad = this.route.snapshot.paramMap.get('id');
    this.esModoEdicion = !!this.idNovedad;

    if (this.esModoEdicion) {
      this.cargarDatos(this.idNovedad!);
    }
  }

  cargarDatos(id: string) {
    this.novedadesService.get(Number(id)).subscribe((data: any) => {
      this.formData = {
        id_carrera: data.id_carrera ?? '',
        titulo: data.titulo ?? '',
        contenido: data.contenido ?? '',
        estado: data.estado ?? 'borrador',
        creadoPor: data.autor ?? 'Coordinación',   // <---- traducción aquí
        destacado: data.destacado ?? 0,
        fecha_publicacion: data.fecha_publicacion ?? ''
      };
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.archivo = file;
  }

  guardar() {
    if (!this.formData.titulo || !this.formData.contenido) {
      alert('Título y contenido son obligatorios.');
      return;
    }

    const fd = new FormData();

    fd.append('titulo', this.formData.titulo);
    fd.append('contenido', this.formData.contenido);
    fd.append('estado', this.formData.estado);

    // ---- TRADUCCIÓN creadoPor → autor ----
    fd.append('autor', this.formData.creadoPor);

    fd.append('id_carrera', this.formData.id_carrera);
    fd.append('destacado', String(this.formData.destacado));
    fd.append('fecha_publicacion', this.formData.fecha_publicacion);

    if (this.archivo) {
      fd.append('archivo', this.archivo);
    }

    if (this.esModoEdicion) {
      fd.append('id', this.idNovedad!);
      this.novedadesService.update(fd).subscribe({
        next: () => {
          alert('Novedad actualizada correctamente');
          this.router.navigate(['/panel/novedades']);
        }
      });
    } else {
      this.novedadesService.create(fd).subscribe({
        next: () => {
          alert('Novedad creada correctamente');
          this.router.navigate(['/panel/novedades']);
        }
      });
    }
  }

  volver() {
    this.router.navigate(['/panel/novedades']);
  }
}
