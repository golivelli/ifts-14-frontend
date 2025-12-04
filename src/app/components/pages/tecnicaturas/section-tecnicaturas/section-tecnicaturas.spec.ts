import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionTecnicaturas } from './section-tecnicaturas';

describe('SectionTecnicaturas', () => {
  let component: SectionTecnicaturas;
  let fixture: ComponentFixture<SectionTecnicaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionTecnicaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionTecnicaturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
