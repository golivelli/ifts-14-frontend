import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpinionsCard } from './opinions-card';

describe('OpinionsCard', () => {
  let component: OpinionsCard;
  let fixture: ComponentFixture<OpinionsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpinionsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpinionsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
