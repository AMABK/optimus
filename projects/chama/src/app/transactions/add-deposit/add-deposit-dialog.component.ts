import { Component, OnInit, ViewChild, Inject, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { Chama } from '../../models/chama/chama';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NotificationService } from 'projects/notification/src/public_api';
import { DepositService } from '../../http/deposit/deposit.service';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddGroupContributionComponent } from '../../home/add-group-contribution/add-group-contribution.component';
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';

@Component({
  selector: "app-add-deposit-dialog",
  templateUrl: "./add-deposit-dialog.component.html",
  styleUrls: ["./add-deposit-dialog.component.css"]
})
export class AddDepositDialogComponent implements OnInit {
  maxPaymentDate = new Date();
  chama$: Observable<Chama>;
  currentDeposit: any;
  activeButton: boolean = true;
  chamaData: any;
  @ViewChild("autosize", { static: true }) autosize: CdkTextareaAutosize;
  constructor(
    private notificationService: NotificationService,
    private depositService: DepositService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddGroupContributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone,
    private chamaService:ChamaService
  ) {}
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  paymentDate = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  deposit = new FormControl("", [Validators.required, Validators.minLength(1)]);
  email = new FormControl("", [Validators.email, Validators.minLength(4)]);
  phoneNumber = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  amount = new FormControl("", [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern("[0]*([1-9]+|[1-9][0-9][0-9]*)")
  ]);
  // tslint:disable-next-line: member-ordering
  location = new FormControl("", [
    Validators.required,
    Validators.minLength(4)
  ]);
  desc = new FormControl("", [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() {
    this.chamaData={
      name:''
    }
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      this.chamaData = result.default_chama;
    });
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
        depositType: this.deposit.value,
        amount: parseInt(this.amount.value, 10),
        description: this.desc.value,
        paymentDate: this.paymentDate.value,
        chamaId: this.data.group.id,
        createdBy: this.authService.getUserData()["user"]["id"],
        status: 0
      };

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
    this.depositService.createDeposit(deposit).subscribe(
      response => {
        this.dialogRef.close("success");
      },
      error => {}
    );
  }

  updateDeposit(chama) {
    // this.depositService.updateDeposit(chama).subscribe(response => {
    //   this.resetCurrentChama();
    //   this.notificationService.emit("Chama details saved!");
    // });
  }
  resetCurrentChama() {
    //this.currentChama = '';
  }
  closeAddDeposit(): void {
    this.dialogRef.close();
  }
}
