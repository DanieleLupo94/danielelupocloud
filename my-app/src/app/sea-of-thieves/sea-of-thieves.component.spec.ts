import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaOfThievesComponent } from './sea-of-thieves.component';

describe('SeaOfThievesComponent', () => {
  let component: SeaOfThievesComponent;
  let fixture: ComponentFixture<SeaOfThievesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaOfThievesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaOfThievesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
