import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidebarComponent } from '../sidebar/sidebar';

@Component({
  selector: 'panel-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './panel-layout.html',
  styleUrl: './panel-layout.css',
  standalone: true
})
export class AdminLayoutComponent {

}
