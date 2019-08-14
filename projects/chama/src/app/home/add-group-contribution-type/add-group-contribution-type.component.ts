import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InviteGroupMembersComponent } from '../invite-group-members/invite-group-members.component';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-group-contribution-type',
  templateUrl: './add-group-contribution-type.component.html',
  styleUrls: ['./add-group-contribution-type.component.css']
})
export class AddGroupContributionTypeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private chamaService: ChamaService,
    private authService: AuthService,
    private loaderIService: LoaderInterceptorService,
    public dialogRef: MatDialogRef<AddGroupContributionTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data = data;
   }

  name = new FormControl("", [Validators.required, Validators.minLength(4)]);
  description = new FormControl("", [Validators.required, Validators.minLength(2)]);
  status = new FormControl("", [Validators.required, Validators.minLength(1)]);
  txn_type = new FormControl("", [Validators.required, Validators.minLength(1)]);

  matcher = new FormErrorService();

  ngOnInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) {
  }

  onSubmit() {
    if (this.name.valid && this.description.valid && this.status.valid && this.txn_type.valid) {
      let currentContributionType = {
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
