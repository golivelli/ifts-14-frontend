import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="flex flex-col min-h-screen">
      <app-navbar></app-navbar>
      <main class="flex-grow pt-20">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  standalone: true
})
export class App {

}
