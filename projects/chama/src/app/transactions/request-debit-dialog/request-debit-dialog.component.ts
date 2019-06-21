import { OnInit, Inject, Component } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { DebitService } from '../../http/debit/debit.service';
import { NotificationService } from 'projects/notification/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';

@Component({
  selector: "app-request-debit-dialog",
  templateUrl: "./request-debit-dialog.component.html",
  styleUrls: ["./request-debit-dialog.component.css"]
})
export class RequestDebitDialogComponent implements OnInit {
  chamaData: any;
  loanRequest: any;
  constructor(
    public dialogRef: MatDialogRef<RequestDebitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private debitService: DebitService,
    private notificationService: NotificationService,
    private chamaService: ChamaService
  ) {}
  amount = new FormControl("", [Validators.required, Validators.min(10)]);
  loanFrom = new FormControl("", [Validators.required]);
  reason = new FormControl("", [Validators.required, Validators.minLength(3)]);
  paymentDate = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);
  disbursementDate = new FormControl("", [
    Validators.required,
    Validators.minLength(8)
  ]);
  matcher = new FormErrorService();
  ngOnInit() {
    this.chamaData = {
      name:''
    }
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      this.chamaData = result.default_chama;
    });
  }
  onSubmit() {
    if (
      this.amount.valid &&
      this.loanFrom.valid &&
      this.reason.valid &&
      this.disbursementDate.valid &&
      this.paymentDate.valid
    ) {
      this.loanRequest = {
        disbursement_date: this.disbursementDate.value,
        payment_date: this.paymentDate.value,
        reason: this.reason.value,
        debit_from: this.loanFrom.value,
        amount: this.amount.value,
        status: 0
      };
      this.saveLoanRequest(this.loanRequest);
    }
  }
  saveLoanRequest(loan) {
    if (!loan.id) {
      loan.id = this.chamaData.id
      this.createLoanRequest(loan);
    } else {
      loan.id = this.chamaData.id;
      this.updateLoanRequest(loan);
    }
  }
  createLoanRequest(loan) {
    this.debitService.createDebitRequest(loan).subscribe(
      response => {
        this.notificationService.emit(
          "Loan request successfully made",
          "success"
        );
        this.dialogRef.close("success");
      },
      error => {}
    );
  }
  updateLoanRequest(loan) {
    this.debitService.updateDebitRequest(loan).subscribe(
      response => {
        this.dialogRef.close("success");
      },
      error => {}
    );
  }
  closeRequestLoan(): void {
    this.dialogRef.close();
  }
}
