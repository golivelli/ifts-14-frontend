import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="bg-slate-800 text-white py-8 mt-auto">
      <div class="container mx-auto px-8 text-center">
        <p class="mb-2">&copy; 2025 IFTS N° 14 - Instituto de Formación Técnica Superior N°14</p>
        <p class="text-sm text-gray-400">Cochabamba 2830, CABA - Buenos Aires, Argentina</p>
        <p class="text-sm text-gray-400 mt-2">Desarrollado con Angular 20</p>
      </div>
    </footer>
  `,
  styles: []
})
export class FooterComponent {

}
