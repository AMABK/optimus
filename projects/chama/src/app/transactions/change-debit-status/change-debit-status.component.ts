import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { DebitService } from '../../http/debit/debit.service';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-change-debit-status',
  templateUrl: './change-debit-status.component.html',
  styleUrls: ['./change-debit-status.component.css']
})
export class ChangeDebitStatusComponent implements OnInit {
  reason = new FormControl("", [Validators.required, Validators.minLength(4)]);
  status = new FormControl("", [Validators.required]);
  debit_id = new FormControl(this.data.element.id, [Validators.required]);
  debitData: any;
  matcher = new FormErrorService();
  constructor(
    private authService: AuthService,
    private debitService: DebitService,
    private loaderIService: LoaderInterceptorService,
    public dialogRef: MatDialogRef<ChangeDebitStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  closeChangeDebitStatus(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    if (
      this.reason.valid &&
      this.debit_id.valid &&
      this.status.valid
    ) {
      this.debitData = {
        reason: this.reason.value,
        debit_id: this.debit_id.value,
        status: this.status.value
      }
      this.debitService.updateDebitRequestStatus(this.debitData).subscribe(
        result => {
          // set message to be emitted by loader interceptor after http requests end
          this.loaderIService.storeNotificationMessage(
            'Request successfully updated!',
            'success'
          );
          this.dialogRef.close("success");
        },
        error => {
          this.loaderIService.storeNotificationMessage("Request failed, please try again!",'danger');
         }
      );
    }
  }
  deleteDebitRequest(debitId) {
  //  console.log(this.authService.getUserData().user)
    const debitData = {
      chama_id:this.authService.getUserData().user.chama_id,
      user_id:this.authService.getUserData().user.id,
      debit_id: debitId
    }
    this.debitService.deleteDebitRequest(debitData).subscribe(
      result => {
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage(
          'Request successfully deleted!',
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
