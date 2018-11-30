import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderChildsComponent } from './trader-childs.component';

describe('TraderChildsComponent', () => {
  let component: TraderChildsComponent;
  let fixture: ComponentFixture<TraderChildsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraderChildsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraderChildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
