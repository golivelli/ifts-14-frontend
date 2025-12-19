import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';

@Component({
  selector: 'web-layout',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './web-layout.html',
  styleUrl: './web-layout.css',
  standalone: true
})
export class WebLayoutComponent {
  isHeaderTransparent = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const currentRoute = event.urlAfterRedirects;

        // Rutas donde el header DEBE ser transparente
        const transparentRoutes = ['/'];

        this.isHeaderTransparent = transparentRoutes.includes(currentRoute);
      });
  }
}
