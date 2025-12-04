import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemasEmebidos } from './sistemas-emebidos';

describe('SistemasEmebidos', () => {
  let component: SistemasEmebidos;
  let fixture: ComponentFixture<SistemasEmebidos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemasEmebidos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SistemasEmebidos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
