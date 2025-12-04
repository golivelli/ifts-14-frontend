import { Component } from '@angular/core';

import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatDividerModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {

}
