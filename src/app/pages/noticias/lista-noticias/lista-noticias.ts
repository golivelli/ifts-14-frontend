import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../../services/noticias';

@Component({
  selector: 'app-lista-noticias',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-noticias.html',
  styleUrl: './lista-noticias.css'
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  filtroTipo: string = 'todas';
  loading = true;

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.cargarNoticias();
  }

  cargarNoticias(): void {
    this.loading = true;
    this.noticiasService.getNoticias().subscribe({
      next: (noticias) => {
        this.noticias = noticias.filter(n => n.status === 'publicado');
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        this.loading = false;
      }
    });
  }

  filtrarPorTipo(tipo: string): void {
    this.filtroTipo = tipo;
  }

  get noticiasFiltradas(): Noticia[] {
    if (this.filtroTipo === 'todas') {
      return this.noticias;
    }
    return this.noticias.filter(n => n.tipo === this.filtroTipo);
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
