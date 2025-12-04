import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadquartersAndSurroundings } from './headquarters-and-surroundings';

describe('HeadquartersAndSurroundings', () => {
  let component: HeadquartersAndSurroundings;
  let fixture: ComponentFixture<HeadquartersAndSurroundings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeadquartersAndSurroundings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadquartersAndSurroundings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
