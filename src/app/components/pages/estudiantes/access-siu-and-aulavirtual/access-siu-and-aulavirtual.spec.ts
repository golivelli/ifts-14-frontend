import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSiuAndAulavirtual } from './access-siu-and-aulavirtual';

describe('AccessSiuAndAulavirtual', () => {
  let component: AccessSiuAndAulavirtual;
  let fixture: ComponentFixture<AccessSiuAndAulavirtual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessSiuAndAulavirtual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessSiuAndAulavirtual);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
