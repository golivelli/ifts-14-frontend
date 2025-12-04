import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspiringExperiences } from './inspiring-experiences';

describe('InspiringExperiences', () => {
  let component: InspiringExperiences;
  let fixture: ComponentFixture<InspiringExperiences>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InspiringExperiences]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspiringExperiences);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
