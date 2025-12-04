import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesAndCalendar } from './schedules-and-calendar';

describe('SchedulesAndCalendar', () => {
  let component: SchedulesAndCalendar;
  let fixture: ComponentFixture<SchedulesAndCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulesAndCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulesAndCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
