import { Component } from '@angular/core';

@Component({
  selector: 'app-headquarters-and-surroundings',
  imports: [],
  templateUrl: './headquarters-and-surroundings.html',
  styleUrl: './headquarters-and-surroundings.css'
})
export class HeadquartersAndSurroundings {
  open = false;
  
  toggle() {
    this.open = !this.open;
  }
}
