import { Component } from '@angular/core';

@Component({
  selector: 'app-mission-vision',
  imports: [],
  templateUrl: './mission-vision.html',
  styleUrl: './mission-vision.css'
})
export class MissionVision {
  open = true;
  
  toggle() {
    this.open = !this.open;
  }
}
