import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellBitCoinsComponent } from './sell-bit-coins.component';

describe('SellBitCoinsComponent', () => {
  let component: SellBitCoinsComponent;
  let fixture: ComponentFixture<SellBitCoinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellBitCoinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellBitCoinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
