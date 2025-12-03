import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnunciosService, Anuncio } from '../../services/anuncios.service';

@Component({
  selector: 'novedades',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './novedades.html',
  styleUrl: './novedades.css'
})
export class NovedadesComponent implements OnInit {
  private anunciosService = inject(AnunciosService);

  anuncios = signal<Anuncio[]>([]);
  filtroEstado = signal<string>('');
  busqueda = signal<string>('');
  cargando = signal<boolean>(false);

  ngOnInit() {
    this.cargarAnuncios();
  }

  cargarAnuncios() {
    this.cargando.set(true);
    const estado = this.filtroEstado();

    this.anunciosService.getAnuncios(estado || undefined).subscribe({
      next: (data) => {
        this.anuncios.set(data);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar anuncios:', error);
        this.cargando.set(false);
        alert('Error al cargar los anuncios');
      }
    });
  }

  filtrarPorEstado(estado: string) {
    this.filtroEstado.set(estado);
    this.cargarAnuncios();
  }

  get anunciosFiltrados() {
    const busqueda = this.busqueda().toLowerCase();
    if (!busqueda) return this.anuncios();

    return this.anuncios().filter(a =>
      a.titulo.toLowerCase().includes(busqueda) ||
      a.contenido.toLowerCase().includes(busqueda)
    );
  }

  eliminarAnuncio(id: number) {
    if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;

    this.anunciosService.deleteAnuncio(id).subscribe({
      next: () => {
        this.cargarAnuncios();
        alert('Anuncio eliminado exitosamente');
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el anuncio');
      }
    });
  }

  toggleDestacado(anuncio: Anuncio) {
    const nuevoValor = anuncio.destacado === 1 ? 0 : 1;

    this.anunciosService.toggleDestacado(anuncio.id!, nuevoValor).subscribe({
      next: () => {
        this.cargarAnuncios();
      },
      error: (error) => {
        console.error('Error al actualizar:', error);
        alert('Error al actualizar el anuncio');
      }
    });
  }

  publicarAnuncio(id: number) {
    this.anunciosService.publicarAnuncio(id).subscribe({
      next: () => {
        this.cargarAnuncios();
        alert('Anuncio publicado exitosamente');
      },
      error: (error) => {
        console.error('Error al publicar:', error);
        alert('Error al publicar el anuncio');
      }
    });
  }

  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'publicado': return 'bg-green-100 text-green-800';
      case 'borrador': return 'bg-yellow-100 text-yellow-800';
      case 'archivado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
