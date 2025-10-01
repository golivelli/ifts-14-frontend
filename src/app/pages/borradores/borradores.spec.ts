import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Borradores } from './borradores';

describe('Borradores', () => {
  let component: Borradores;
  let fixture: ComponentFixture<Borradores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Borradores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Borradores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
