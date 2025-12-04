import { Component } from '@angular/core';

@Component({
  selector: 'app-strategic-careers',
  imports: [],
  templateUrl: './strategic-careers.html',
  styleUrl: './strategic-careers.css'
})
export class StrategicCareers {
  open = false;
  
  toggle() {
    this.open = !this.open;
  }
}
