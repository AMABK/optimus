import { Component, OnInit, Inject, NgZone, ViewChild } from '@angular/core';
import { environment } from 'projects/chama/src/environments/environment';
import { Observable } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { Chama } from '../../models/chama/chama';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { DepositService } from '../../http/deposit/deposit.service';



@Component({
  selector: 'app-add-group-contribution',
  templateUrl: './add-group-contribution.component.html',
  styleUrls: ['./add-group-contribution.component.css']
})
export class AddGroupContributionComponent implements OnInit {
  chama$: Observable<Chama>;
  currentDeposit: any;
  activeButton: boolean = true;
  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;
  constructor(
    private notificationService: NotificationService,
    private depositService: DepositService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddGroupContributionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngZone: NgZone
  ) {}
  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  paymentDate = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  deposit = new FormControl('', [Validators.required, Validators.minLength(1)]);
  email = new FormControl('', [Validators.email, Validators.minLength(4)]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  amount = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('[0]*([1-9]+|[1-9][0-9][0-9]*)')
  ]);
// tslint:disable-next-line: member-ordering
  location = new FormControl('', [
    Validators.required,
    Validators.minLength(4)
  ]);
  desc = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() {}
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
        createdBy: this.authService.getUserData()['user']['id'],
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
        this.dialogRef.close('success');
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
  closeAddGroupContribution(): void {
    this.dialogRef.close();
  }
}
