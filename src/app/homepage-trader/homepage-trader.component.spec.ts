import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTraderComponent } from './homepage-trader.component';

describe('HomepageTraderComponent', () => {
  let component: HomepageTraderComponent;
  let fixture: ComponentFixture<HomepageTraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageTraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
