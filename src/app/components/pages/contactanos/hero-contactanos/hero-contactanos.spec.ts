import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroContactanos } from './hero-contactanos';

describe('HeroContactanos', () => {
  let component: HeroContactanos;
  let fixture: ComponentFixture<HeroContactanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroContactanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroContactanos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
