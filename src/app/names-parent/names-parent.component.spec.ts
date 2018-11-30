import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamesParentComponent } from './names-parent.component';

describe('NamesParentComponent', () => {
  let component: NamesParentComponent;
  let fixture: ComponentFixture<NamesParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NamesParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamesParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
