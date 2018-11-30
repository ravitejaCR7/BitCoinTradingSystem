import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingPartComponent } from './testing-part.component';

describe('TestingPartComponent', () => {
  let component: TestingPartComponent;
  let fixture: ComponentFixture<TestingPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestingPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestingPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
