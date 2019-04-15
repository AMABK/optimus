import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupContributionTypeComponent } from './add-group-contribution-type.component';

describe('AddGroupContributionTypeComponent', () => {
  let component: AddGroupContributionTypeComponent;
  let fixture: ComponentFixture<AddGroupContributionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupContributionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupContributionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
