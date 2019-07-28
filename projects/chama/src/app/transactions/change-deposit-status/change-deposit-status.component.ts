import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDebitStatusComponent } from '../change-debit-status/change-debit-status.component';
import { DepositService } from '../../http/deposit/deposit.service';

@Component({
  selector: 'app-change-deposit-status',
  templateUrl: './change-deposit-status.component.html',
  styleUrls: ['./change-deposit-status.component.css']
})
export class ChangeDepositStatusComponent implements OnInit {

  reason = new FormControl("", [Validators.required, Validators.minLength(4)]);
  status = new FormControl("", [Validators.required]);
  deposit_id = new FormControl(this.data.element.id, [Validators.required]);
  depositData: any;
  userId = this.authService.getUserId();
  matcher = new FormErrorService();
  constructor(
    private authService: AuthService,
    private depositService: DepositService,
    private loaderIService: LoaderInterceptorService,
    public dialogRef: MatDialogRef<ChangeDebitStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }


  closeChangeDepositStatus(): void {
    this.status.setErrors({ 'invalid': true });
    this.dialogRef.close();
  }
  onSubmit() {
    if (
      this.deposit_id.valid &&
      this.status.valid
    ) {
      this.depositData = {
        owner_id: this.authService.getUserId(),
        user_id: this.data.element.user_id,
       // reason: this.reason.value,
        deposit_id: this.deposit_id.value,
        status: this.status.value
      }
      this.depositService.updateDepositStatus(this.depositData).subscribe(
        result => {
          // set message to be emitted by loader interceptor after http requests end
          this.loaderIService.storeNotificationMessage(
            'Deposit successfully updated!',
            'success'
          );
          this.dialogRef.close("success");
        },
        error => {
          this.loaderIService.storeNotificationMessage("Request failed, please try again!", 'danger');
        }
      );
    }
  }
  deleteDeposit(depositId) {
    const depositData = {
      user_id: this.data.element.user_id,
      status: this.data.element.verified,
      owner_id: this.authService.getUserData().user.id,
      deposit_id: depositId
    }
    this.depositService.deleteDeposit(depositData).subscribe(
      result => {
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage(
          'Deposit successfully deleted!',
          'success'
        );
        this.dialogRef.close("success");
      },
      error => {
        //this.loaderIService.storeNotificationMessage("Request failed, please try again!", 'danger');
      }
    );
  }
  ngOnInit() {

  }
}
