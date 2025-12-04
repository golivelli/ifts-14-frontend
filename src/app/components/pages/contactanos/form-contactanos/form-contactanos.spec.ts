import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContactanos } from './form-contactanos';

describe('FormContactanos', () => {
  let component: FormContactanos;
  let fixture: ComponentFixture<FormContactanos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormContactanos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormContactanos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
