import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupTransactionTypeComponent } from './add-group-transaction-type.component';

describe('AddGroupContributionTypeComponent', () => {
  let component: AddGroupTransactionTypeComponent;
  let fixture: ComponentFixture<AddGroupTransactionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddGroupTransactionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupTransactionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
