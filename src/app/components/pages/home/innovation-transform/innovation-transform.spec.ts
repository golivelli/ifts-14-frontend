import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnovationTransform } from './innovation-transform';

describe('InnovationTransform', () => {
  let component: InnovationTransform;
  let fixture: ComponentFixture<InnovationTransform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnovationTransform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnovationTransform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
