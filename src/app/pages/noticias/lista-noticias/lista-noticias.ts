import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButton } from '@/app/components/globals/primary-button/primary-button';
import { Noticia, NoticiasService } from '@/app/services/noticias';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-noticias',
  imports: [CommonModule, RouterLink, PrimaryButton],
  templateUrl: './lista-noticias.html',
  styleUrl: './lista-noticias.css'
})
export class ListaNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  loading = true;
  activeTab: 'anuncio' | 'novedad' = 'anuncio';

  page = 1;
  pageSize = 9;

  constructor(public noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  setActiveTab(tab: 'anuncio' | 'novedad') {
    this.activeTab = tab;
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
    const filtradas = this.noticias.filter(n => n.tipo === this.activeTab);

    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;

    return filtradas.slice(start, end);
  }

  get totalPaginas(): number {
    return Math.ceil(
      this.noticias.filter(n => n.tipo === this.activeTab).length / this.pageSize
    );
  }
}
