import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tecnicatura1 } from './tecnicatura-1';

describe('Tecnicatura1', () => {
  let component: Tecnicatura1;
  let fixture: ComponentFixture<Tecnicatura1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tecnicatura1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tecnicatura1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
