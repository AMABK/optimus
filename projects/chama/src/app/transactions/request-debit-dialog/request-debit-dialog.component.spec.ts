import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDebitDialogComponent } from './request-debit-dialog.component';

describe('RequestLoanDialogComponent', () => {
  let component: RequestDebitDialogComponent;
  let fixture: ComponentFixture<RequestDebitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDebitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDebitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
