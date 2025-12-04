import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from '../../services/anuncios.service';
import { Novedad } from '../../models/novedad';

@Component({
  selector: 'app-novedad',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './novedad.html'
})
export class NovedadComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private anunciosService = inject(AnunciosService);

  form!: FormGroup;

  cargando = signal(true);
  guardando = signal(false);
  anuncioId = signal<number | null>(null);

  ngOnInit(): void {

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      contenido: ['', Validators.required],
      id_carrera: ['3'],
      imagen_url: [''],
      estado: ['borrador', Validators.required],
      destacado: [false],
      autor: ['']
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        const id = Number(params['id']);
        this.anuncioId.set(id);
        this.cargarAnuncio(id);
      } else {
        this.cargando.set(false);
      }
    });
  }

  cargarAnuncio(id: number) {
    this.anunciosService.getAnuncio(id).subscribe({
      next: (data: Novedad) => {
        if (data) {
          this.form.patchValue({
            titulo: data.titulo,
            contenido: data.contenido,
            id_carrera: data.id_carrera,
            imagen_url: data.imagen_url,
            estado: data.estado,
            destacado: data.destacado === 1,
            autor: data.autor
          });
        }
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  guardar() {
    if (this.form.invalid) return;

    this.guardando.set(true);

    const payload: Partial<Novedad> = {
      ...this.form.value,
      destacado: this.form.value.destacado ? 1 : 0
    };

    if (this.anuncioId()) {
      this.anunciosService.actualizarAnuncio(this.anuncioId()!, payload).subscribe({
        next: () => {
          this.guardando.set(false);
          this.router.navigate(['/novedades']);
        },
        error: () => this.guardando.set(false)
      });

    } else {
      this.anunciosService.crearAnuncio(payload).subscribe({
        next: () => {
          this.guardando.set(false);
          this.router.navigate(['/novedades']);
        },
        error: () => this.guardando.set(false)
      });
    }
  }

  cancelar() {
    this.router.navigate(['/novedades']);
  }
}
