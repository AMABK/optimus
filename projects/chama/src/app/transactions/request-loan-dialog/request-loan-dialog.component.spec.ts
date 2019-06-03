import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestLoanDialogComponent } from './request-loan-dialog.component';

describe('RequestLoanDialogComponent', () => {
  let component: RequestLoanDialogComponent;
  let fixture: ComponentFixture<RequestLoanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestLoanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestLoanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
