import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademySection } from './academy-section';

describe('AcademySection', () => {
  let component: AcademySection;
  let fixture: ComponentFixture<AcademySection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademySection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademySection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
