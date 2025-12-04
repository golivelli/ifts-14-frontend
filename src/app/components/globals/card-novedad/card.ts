import { Component, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Noticia, NoticiasService } from '@/app/services/noticias';
import { RouterLink } from '@angular/router';
import { PrimaryButton } from '../primary-button/primary-button';
import { CommonModule } from '@angular/common'; // Importante para clases dinámicas si las usas

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [PrimaryButton, MatDividerModule, RouterLink, CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card implements OnInit {
  allNoticias: Noticia[] = [];      // Aquí guardamos TODAS las noticias
  filteredNoticias: Noticia[] = []; 
  noticiasVisibles: Noticia[] = []; // Aquí guardamos solo las 3 que se ven
  currentIndex: number = 0;         // Controla en qué posición estamos
  itemsToShow: number = 3;          // Cantidad de noticias a mostrar

  _filtroCategoria: string = 'novedad';
  @Input() 
  set filtroCategoria(valor: 'novedad' | 'anuncio') {
    this._filtroCategoria = valor;
    // Cada vez que el padre cambia el botón, refiltramos y reseteamos el carrusel a 0
    this.aplicarFiltros(); 
  }

  constructor(public noticiasService: NoticiasService) { }

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe({
      next: (noticias) => {
        // 1. Guardamos todas las filtradas por status
        this.allNoticias = noticias.filter(n => n.status === 'publicado');
        
        // 2. Inicializamos la vista
        this.aplicarFiltros();
      }
    });
  }

  aplicarFiltros() {
    // 1. Filtramos 'allNoticias' según lo que mandó el padre
    this.filteredNoticias = this.allNoticias.filter(n => 
      n.tipo?.toLowerCase() === this._filtroCategoria.toLowerCase() 
    );

    // 2. Reseteamos el índice para volver al principio del carrusel
    this.currentIndex = 0;

    // 3. Actualizamos la vista
    this.updateVisibleNoticias();
  }

  // Actualiza el array de lo que se ve en pantalla
  updateVisibleNoticias() {
    // Cortamos desde el índice actual hasta índice + 3
    this.noticiasVisibles = this.filteredNoticias.slice(this.currentIndex, this.currentIndex + this.itemsToShow);
  }

  get notiVisibles() {
    // No permite que currentIndex exceda el límite
    const maxIndex = Math.max(0, this.filteredNoticias.length - this.itemsToShow);
    this.currentIndex = Math.min(this.currentIndex, maxIndex);

    return this.filteredNoticias.slice(
      this.currentIndex,
      this.currentIndex + this.itemsToShow
    );
  }

  prev() {
    const maxIndex = this.filteredNoticias.length - this.itemsToShow;

    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }
    
    // if (this.currentIndex > 0) {
    //   this.currentIndex--;
    //   this.updateVisibleNoticias();
    // }
  }

  next() {
    const maxIndex = this.filteredNoticias.length - this.itemsToShow;

    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
    }

    // if (this.currentIndex + this.itemsToShow < this.allNoticias.length) {
    //   this.currentIndex++; 
    //   this.updateVisibleNoticias();
    // }
  }
}