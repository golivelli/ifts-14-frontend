import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTecnicatura } from './card-tecnicatura';

describe('CardTecnicatura', () => {
  let component: CardTecnicatura;
  let fixture: ComponentFixture<CardTecnicatura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTecnicatura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTecnicatura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
