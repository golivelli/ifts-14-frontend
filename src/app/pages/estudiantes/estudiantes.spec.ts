import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estudiante } from './estudiantes';

describe('Estudiante', () => {
  let component: Estudiante;
  let fixture: ComponentFixture<Estudiante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Estudiante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Estudiante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
