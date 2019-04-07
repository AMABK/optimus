import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupPaymentDetailsComponent } from './add-group-payment-details.component';

describe('AddGroupPaymentDetailsComponent', () => {
  let component: AddGroupPaymentDetailsComponent;
  let fixture: ComponentFixture<AddGroupPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
