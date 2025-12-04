import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresAndCertifications } from './procedures-and-certifications';

describe('ProceduresAndCertifications', () => {
  let component: ProceduresAndCertifications;
  let fixture: ComponentFixture<ProceduresAndCertifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresAndCertifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceduresAndCertifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
