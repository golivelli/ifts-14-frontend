import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  standalone: true
})
export class SidebarComponent {
  isOpen = signal(false);

  toggleSidebar() {
    this.isOpen.set(!this.isOpen());
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}
