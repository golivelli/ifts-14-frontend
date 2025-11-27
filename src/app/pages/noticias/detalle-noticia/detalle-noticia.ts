import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../../services/noticias';

@Component({
  selector: 'app-detalle-noticia',
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-noticia.html',
  styleUrl: './detalle-noticia.css'
})
export class DetalleNoticiaComponent implements OnInit {
  noticia?: Noticia;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    public noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarNoticia(id);
    }
  }

  cargarNoticia(id: string): void {
    this.loading = true;
    this.noticiasService.getNoticiaById(id).subscribe({
      next: (noticia) => {
        this.noticia = noticia;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar noticia:', error);
        this.loading = false;
      }
    });
  }
}
