import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepositDialogComponent } from './add-deposit-dialog.component';

describe('AddDepositComponent', () => {
  let component: AddDepositDialogComponent;
  let fixture: ComponentFixture<AddDepositDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepositDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepositDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
