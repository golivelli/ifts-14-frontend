import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerSkills } from './career-skills';

describe('CareerSkills', () => {
  let component: CareerSkills;
  let fixture: ComponentFixture<CareerSkills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareerSkills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareerSkills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
