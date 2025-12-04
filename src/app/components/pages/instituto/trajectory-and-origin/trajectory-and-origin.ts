import { Component } from '@angular/core';

@Component({
  selector: 'app-trajectory-and-origin',
  imports: [],
  templateUrl: './trajectory-and-origin.html',
  styleUrl: './trajectory-and-origin.css'
})
export class TrajectoryAndOrigin {
  open = false;
  
  toggle() {
    this.open = !this.open;
  }
}
