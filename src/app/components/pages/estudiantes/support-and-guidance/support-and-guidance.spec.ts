import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportAndGuidance } from './support-and-guidance';

describe('SupportAndGuidance', () => {
  let component: SupportAndGuidance;
  let fixture: ComponentFixture<SupportAndGuidance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportAndGuidance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportAndGuidance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
