import { Component, HostListener, Input } from  '@angular/core';
import { RouterLink  } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
  imports: [RouterLink],
  standalone: true
})
export class HeaderComponent {
  @Input() isTransparent: boolean = false;

  isScrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
