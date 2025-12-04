import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipOpportunities } from './scholarship-opportunities';

describe('ScholarshipOpportunities', () => {
  let component: ScholarshipOpportunities;
  let fixture: ComponentFixture<ScholarshipOpportunities>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipOpportunities]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScholarshipOpportunities);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
