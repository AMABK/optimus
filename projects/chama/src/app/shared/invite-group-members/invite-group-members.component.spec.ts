import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteGroupMembersComponent } from './invite-group-members.component';

describe('InviteGroupMembersComponent', () => {
  let component: InviteGroupMembersComponent;
  let fixture: ComponentFixture<InviteGroupMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteGroupMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteGroupMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
