import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestExitGroupComponent } from './request-exit-group.component';

describe('RequestExitGroupComponent', () => {
  let component: RequestExitGroupComponent;
  let fixture: ComponentFixture<RequestExitGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestExitGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestExitGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
