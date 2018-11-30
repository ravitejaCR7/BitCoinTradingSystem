import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildNamesComponent } from './child-names.component';

describe('ChildNamesComponent', () => {
  let component: ChildNamesComponent;
  let fixture: ComponentFixture<ChildNamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildNamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildNamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
