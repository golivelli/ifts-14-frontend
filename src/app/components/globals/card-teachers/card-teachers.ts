import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-teachers',
  imports: [],
  templateUrl: './card-teachers.html',
  styleUrl: './card-teachers.css',
})
export class CardTeachers {
  @Input() imgTeacher: string = '';
  @Input() nameTeacher: string = '';
  @Input() contactTeacher: string = '';
}