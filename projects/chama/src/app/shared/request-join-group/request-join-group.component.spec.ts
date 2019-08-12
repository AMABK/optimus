import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestJoinGroupComponent } from './request-join-group.component';

describe('RequestJoinGroupComponent', () => {
  let component: RequestJoinGroupComponent;
  let fixture: ComponentFixture<RequestJoinGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestJoinGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestJoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
