import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia, NoticiasService } from '@/app/services/noticias';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-noticias',
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-noticias.html',
  styleUrl: './lista-noticias.css'
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  loading = true;
  filtroCarrera = 'todas';
  filtroTipo: 'anuncio' | 'novedad' = 'novedad';

  page = 1;
  pageSize = 9;

  constructor(public noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  setFiltroCarrera(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.filtroCarrera = value;
    this.page = 1;
  }

  setFiltroTipo(tipo: 'anuncio' | 'novedad') {
    this.filtroTipo = tipo;
    this.page = 1;
  }

  cargarNoticias(): void {
    this.loading = true;

    this.noticiasService.getNoticias().subscribe({
      next: (noticias) => {
        this.noticias = noticias.filter(n => n.status === 'publicado');
        const hasAnuncios = this.noticias.some(n => n.tipo === 'anuncio');
        this.filtroTipo = hasAnuncios ? 'anuncio' : 'novedad';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticias:', error);
        this.loading = false;
      }
    });
  }

  get noticiasFiltradas(): Noticia[] {
    let filtradas = this.noticias.filter(n => n.tipo === this.filtroTipo);

    if (this.filtroTipo === 'novedad' && this.filtroCarrera !== 'todas') {
      filtradas = filtradas.filter(n => n.tecnicatura_id === Number(this.filtroCarrera));
    }

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    return filtradas.slice(start, end);
  }

  get totalPaginas(): number {
    let total = this.noticias.filter(n => n.tipo === this.filtroTipo);

    if (this.filtroTipo === 'novedad' && this.filtroCarrera !== 'todas') {
      total = total.filter(n => n.tecnicatura_id === Number(this.filtroCarrera));
    }

    return Math.ceil(total.length / this.pageSize);
  }
}
