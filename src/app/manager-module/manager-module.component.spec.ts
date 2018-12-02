import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerModuleComponent } from './manager-module.component';

describe('ManagerModuleComponent', () => {
  let component: ManagerModuleComponent;
  let fixture: ComponentFixture<ManagerModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
