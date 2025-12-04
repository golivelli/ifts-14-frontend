import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicCareers } from './strategic-careers';

describe('StrategicCareers', () => {
  let component: StrategicCareers;
  let fixture: ComponentFixture<StrategicCareers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrategicCareers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategicCareers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
