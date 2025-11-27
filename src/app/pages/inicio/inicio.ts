import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NoticiasService, Noticia } from '../../services/noticias';

@Component({
  selector: 'app-inicio',
  imports: [CommonModule, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioComponent implements OnInit {
  noticiasRecientes: Noticia[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (noticias) => {
        this.noticiasRecientes = noticias
          .filter(n => n.status === 'publicado')
          .slice(0, 3);
      }
    });
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
