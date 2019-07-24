import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDebitStatusComponent } from './change-debit-status.component';

describe('ChangeStatusComponent', () => {
  let component: ChangeDebitStatusComponent;
  let fixture: ComponentFixture<ChangeDebitStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeDebitStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeDebitStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
