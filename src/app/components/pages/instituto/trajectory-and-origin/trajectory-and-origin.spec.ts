import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryAndOrigin } from './trajectory-and-origin';

describe('TrajectoryAndOrigin', () => {
  let component: TrajectoryAndOrigin;
  let fixture: ComponentFixture<TrajectoryAndOrigin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrajectoryAndOrigin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrajectoryAndOrigin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
