import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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

}
