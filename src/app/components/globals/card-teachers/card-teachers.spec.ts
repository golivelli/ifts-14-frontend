import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeachers } from './card-teachers';

describe('CardTeachers', () => {
  let component: CardTeachers;
  let fixture: ComponentFixture<CardTeachers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTeachers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTeachers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
