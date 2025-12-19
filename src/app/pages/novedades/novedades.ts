import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AnunciosService } from '../../services/anuncios.service';
import { Novedad } from '../../models/novedad';

@Component({
  selector: 'app-novedades',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './novedades.html'
})
export class NovedadesComponent implements OnInit {

  private anunciosService = inject(AnunciosService);

  cargando = signal(true);
  anuncios = signal<Novedad[]>([]);

  // Filtros
  busqueda = signal('');
  filtroEstado = signal('');

  // Lista filtrada automáticamente
  anunciosFiltrados = computed(() => {
    const texto = this.busqueda().toLowerCase();
    const estado = this.filtroEstado();

    return this.anuncios().filter(a => {
      const matchTexto =
        a.titulo.toLowerCase().includes(texto) ||
        a.contenido.toLowerCase().includes(texto);

      const matchEstado = estado === '' ? true : a.estado === estado;

      return matchTexto && matchEstado;
    });
  });

  ngOnInit() {
    this.cargarAnuncios();
  }

  cargarAnuncios() {
    this.cargando.set(true);

    this.anunciosService.getAnuncios().subscribe({
      next: (data) => {
        this.anuncios.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      }
    });
  }

  // Clases por estado (chips)
  getEstadoClass(estado: string) {
    return {
      'bg-green-100 text-green-800': estado === 'publicado',
      'bg-yellow-100 text-yellow-800': estado === 'borrador',
      'bg-gray-200 text-gray-600': estado === 'archivado'
    };
  }

  // Filtro manual
  filtrarPorEstado(estado: string) {
    this.filtroEstado.set(estado);
  }

  // Cambiar destacado (☆ / ⭐)
  toggleDestacado(anuncio: Novedad) {
    const nuevoValor = anuncio.destacado === 1 ? 0 : 1;

    this.anunciosService.toggleDestacado(anuncio.id, nuevoValor).subscribe({
      next: () => {
        const lista = [...this.anuncios()];
        const idx = lista.findIndex(a => a.id === anuncio.id);
        if (idx !== -1) {
          lista[idx] = { ...anuncio, destacado: nuevoValor };
          this.anuncios.set(lista);
        }
      }
    });
  }

  // Publicar => estado = 'publicado'
  publicarAnuncio(anuncio: Novedad) {
    if (!confirm('Publicar este anuncio?')) return;
    const payload: Partial<Novedad> = {
      ...anuncio,
      estado: 'publicado'
    };

    this.anunciosService.actualizarAnuncio(anuncio.id, payload).subscribe({
      next: () => {
        const lista = [...this.anuncios()];
        const idx = lista.findIndex(a => a.id === anuncio.id);
        if (idx !== -1) {
          lista[idx].estado = 'publicado';
          this.anuncios.set(lista);
        }
      }
    });
  }

  // Eliminar anuncio
  eliminarAnuncio(id: number) {
    if (!confirm('¿Seguro que querés eliminar este anuncio?')) return;

    this.anunciosService.eliminarAnuncio(id).subscribe({
      next: () => {
        this.anuncios.set(this.anuncios().filter(a => a.id !== id));
      }
    });
  }
}




