import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EficienciaEnergetica } from './eficiencia-energetica';

describe('EficienciaEnergetica', () => {
  let component: EficienciaEnergetica;
  let fixture: ComponentFixture<EficienciaEnergetica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EficienciaEnergetica]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EficienciaEnergetica);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
