import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupContributionComponent } from './add-group-contribution.component';

describe('AddGroupContributionComponent', () => {
  let component: AddGroupContributionComponent;
  let fixture: ComponentFixture<AddGroupContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
