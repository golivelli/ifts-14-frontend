import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnunciosService, Anuncio } from '../../services/anuncios.service';

@Component({
  selector: 'novedad',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './novedad.html',
  styleUrl: './novedad.css'
})
export class NovedadComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private anunciosService = inject(AnunciosService);

  form!: FormGroup;
  anuncioId = signal<number | null>(null);
  cargando = signal<boolean>(false);
  guardando = signal<boolean>(false);

  ngOnInit() {
    this.initForm();

    // Verificar si estamos editando
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.anuncioId.set(+params['id']);
        this.cargarAnuncio(+params['id']);
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(255)]],
      contenido: ['', Validators.required],
      estado: ['borrador', Validators.required],
      destacado: [0],
      autor: ['Admin']
    });
  }

  cargarAnuncio(id: number) {
    this.cargando.set(true);

    this.anunciosService.getAnuncio(id).subscribe({
      next: (anuncio) => {
        this.form.patchValue({
          titulo: anuncio.titulo,
          contenido: anuncio.contenido,
          estado: anuncio.estado,
          destacado: anuncio.destacado,
          autor: anuncio.autor
        });
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar anuncio:', error);
        alert('Error al cargar el anuncio');
        this.cargando.set(false);
        this.router.navigate(['/admin-ifts14-2024/novedades']);
      }
    });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    this.guardando.set(true);
    const formData = this.form.value;

    // Convertir destacado a número
    formData.destacado = formData.destacado ? 1 : 0;

    const request = this.anuncioId()
      ? this.anunciosService.updateAnuncio({ ...formData, id: this.anuncioId()! })
      : this.anunciosService.createAnuncio(formData);

    request.subscribe({
      next: () => {
        this.guardando.set(false);
        alert(this.anuncioId() ? 'Anuncio actualizado exitosamente' : 'Anuncio creado exitosamente');
        this.router.navigate(['/admin-ifts14-2024/novedades']);
      },
      error: (error) => {
        console.error('Error al guardar:', error);
        this.guardando.set(false);
        alert('Error al guardar el anuncio');
      }
    });
  }

  cancelar() {
    if (confirm('¿Descartar cambios?')) {
      this.router.navigate(['/admin-ifts14-2024/novedades']);
    }
  }
}
