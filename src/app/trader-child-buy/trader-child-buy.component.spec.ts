import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderChildBuyComponent } from './trader-child-buy.component';

describe('TraderChildBuyComponent', () => {
  let component: TraderChildBuyComponent;
  let fixture: ComponentFixture<TraderChildBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderChildBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderChildBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
