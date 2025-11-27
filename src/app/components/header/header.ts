import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="bg-gradient-to-r from-slate-700 to-slate-800 text-white py-4 shadow-md">
      <div class="container mx-auto px-8 flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          <a routerLink="/" class="hover:text-primary-300 transition-colors">IFTS N° 14</a>
        </h1>
        <nav class="flex gap-8">
          <a routerLink="/" class="hover:bg-white/10 px-4 py-2 rounded transition-colors">Inicio</a>
          <a routerLink="/noticias" class="hover:bg-white/10 px-4 py-2 rounded transition-colors">Noticias</a>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {

}
