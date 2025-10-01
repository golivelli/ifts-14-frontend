import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecnicaturas } from './tecnicaturas';

describe('Tecnicaturas', () => {
  let component: Tecnicaturas;
  let fixture: ComponentFixture<Tecnicaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tecnicaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tecnicaturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
