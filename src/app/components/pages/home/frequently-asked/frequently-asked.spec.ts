import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequentlyAsked } from './frequently-asked';

describe('FrequentlyAsked', () => {
  let component: FrequentlyAsked;
  let fixture: ComponentFixture<FrequentlyAsked>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequentlyAsked]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequentlyAsked);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
