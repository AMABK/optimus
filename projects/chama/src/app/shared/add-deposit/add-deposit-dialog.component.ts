import { Component, OnInit, ViewChild, Inject, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Chama } from '../../models/chama/chama';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DepositService } from '../../http/deposit/deposit.service';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: "app-add-deposit-dialog",
  templateUrl: "./add-deposit-dialog.component.html",
  styleUrls: ["./add-deposit-dialog.component.css"]
})
export class AddDepositDialogComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  maxPaymentDate = new Date();
  chama$: Observable<Chama>;
  currentDeposit: any;
  activeButton = true;
  chamaData: any;
  depositTypes;
  paymentDate = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  deposit = new FormControl("", [Validators.required, Validators.minLength(1)]);
  email = new FormControl("", [Validators.email, Validators.minLength(4)]);
  userId = new FormControl(0, []);
  phoneNumber = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  amount = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0]*([1-9]+|[1-9][0-9][0-9]*)")
  ]);
  desc = new FormControl("", [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();
  @ViewChild("autosize", { static: true }) autosize: CdkTextareaAutosize;
  constructor(
    private depositService: DepositService,
    private authService: AuthService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddDepositDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private chamaService: ChamaService
  ) { }
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  // tslint:disable-next-line: member-ordering
  location = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);

  ngOnInit() {
    this.authService.updateLoadingDataStatus(true)
    this.chamaData = {
      name: ''
    }
    this.subscription.add(this.chamaService.getDefaultChamaDetails().subscribe(result => {
      this.chamaData = result.default_chama;
    }));
    this.subscription.add(this.depositService.getTransactionType('deposit', null).subscribe(result => {
      this.depositTypes = result;
      this.authService.updateLoadingDataStatus(false)
    }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) {
    //console.log(form.value);
  }

  onSubmit() {
    if (
      this.deposit.valid &&
      this.amount.valid &&
      this.paymentDate.valid &&
      this.desc.valid
    ) {
      this.currentDeposit = {
        depositBy: this.data.key.depositBy,
        userId: this.data.key.user.userId,
        depositType: this.deposit.value,
        amount: parseInt(this.amount.value, 10),
        description: this.desc.value,
        paymentDate: this.paymentDate.value,
        chamaId: this.data.key.chamaId,
        createdBy: this.authService.getUserData().user.id,
        status: 0
      };
      this.authService.updateLoadingDataStatus(true)
      this.saveDeposit(this.currentDeposit);
    }
  }

  saveDeposit(deposit) {
    if (!deposit.id) {
      this.createDeposit(deposit);
    } else {
      this.updateDeposit(deposit);
    }
  }
  createDeposit(deposit) {
    this.subscription.add(this.depositService.createDeposit(deposit).subscribe(
      response => {
        this.authService.updateLoadingDataStatus(false)
        this.notificationService.emit(
          "Transaction successful",
          "success"
        );
        this.dialogRef.close("success");
      },
      error => {
        this.authService.updateLoadingDataStatus(false);
      }
    ));
  }

  updateDeposit(chama) {
    this.depositService.updateDeposit(chama).subscribe(response => {
      //this.resetCurrentChama();
      this.authService.updateLoadingDataStatus(false)
      this.notificationService.emit("Deposit details updated");
    }, error => {
      this.authService.updateLoadingDataStatus(false)
      this.notificationService.emit("Request failed");
    });
  }
  resetCurrentChama() {
    //this.currentChama = '';
  }
  closeAddDeposit(): void {
    this.dialogRef.close();
  }
}
