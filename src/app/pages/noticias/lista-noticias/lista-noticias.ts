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

  get noticiasFiltradas(): Noticia[] {
    const filtradas = this.filtroCarrera === 'todas'
      ? this.noticias
      : this.noticias.filter(n => n.tecnicatura_id === Number(this.filtroCarrera));

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    return filtradas.slice(start, end);
  }

  get totalPaginas(): number {
    return Math.ceil(
      (this.filtroCarrera === 'todas'
        ? this.noticias
        : this.noticias.filter(n => n.tecnicatura_id === Number(this.filtroCarrera))
      ).length / this.pageSize
    );
  }
}
