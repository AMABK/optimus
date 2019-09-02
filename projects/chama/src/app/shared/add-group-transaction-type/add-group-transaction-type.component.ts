import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';

@Component({
  selector: 'app-add-group-transaction-type',
  templateUrl: './add-group-transaction-type.component.html',
  styleUrls: ['./add-group-transaction-type.component.css']
})
export class AddGroupTransactionTypeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private chamaService: ChamaService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<AddGroupTransactionTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data;
  }

  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  description = new FormControl('', [Validators.required, Validators.minLength(2)]);
  status = new FormControl('', [Validators.required, Validators.minLength(1)]);
  // tslint:disable-next-line: variable-name
  txn_type = new FormControl('', [Validators.required, Validators.minLength(1)]);

  matcher = new FormErrorService();

  ngOnInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) {
  }

  onSubmit() {
    if (this.name.valid && this.description.valid && this.status.valid && this.txn_type.valid) {
      const currentContributionType = {
        name: this.name.value,
        status: this.status.value,
        txn_type: this.txn_type.value,
        description: this.description.value,
        chama_id: this.authService.getUserData().user.chama_id
      };

      this.createContributionType(currentContributionType);
    }
  }
  createContributionType(currentContributionType) {
    this.subscription.add(this.chamaService.createContributionType(currentContributionType).subscribe(
      response => {
        this.dialogRef.close('success');
      },
      error => { }
    ));
  }
  closeAddGroupContributionTypesDialog(): void {
    this.dialogRef.close();
  }
}
