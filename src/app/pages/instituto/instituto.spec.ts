import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Instituto } from './instituto';

describe('Instituto', () => {
  let component: Instituto;
  let fixture: ComponentFixture<Instituto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Instituto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Instituto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
