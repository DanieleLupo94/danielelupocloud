import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeCoffeeComponent } from './trade-coffee.component';

describe('TradeCoffeeComponent', () => {
  let component: TradeCoffeeComponent;
  let fixture: ComponentFixture<TradeCoffeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeCoffeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeCoffeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
