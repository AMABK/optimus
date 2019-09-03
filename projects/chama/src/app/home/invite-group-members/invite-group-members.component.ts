import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'projects/notification/src/public_api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-invite-group-members',
  templateUrl: './invite-group-members.component.html',
  styleUrls: ['./invite-group-members.component.css']
})
export class InviteGroupMembersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  constructor(
    private chamaService: ChamaService,
    private authService: AuthService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<InviteGroupMembersComponent>
  ) {}

  name = new FormControl('', [Validators.required, Validators.minLength(4)]);
  email = new FormControl('', [Validators.email, Validators.minLength(4)]);
  phoneNumber = new FormControl('', [Validators.required, Validators.minLength(4)]);

  matcher = new FormErrorService();

  ngOnInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  registerChama(form) {
  }

  onSubmit() {
    if (this.name.valid && this.email.valid) {
      const currentInvite = {
        name: this.name.value,
        email: this.email.value,
        phone_number: this.phoneNumber.value,
        chama_id: this.authService.getUserData().user.chama_id
      };

      this.createInvite(currentInvite);
    }
  }
  createInvite(currentInvite) {
    this.subscription.add(this.chamaService.createInvite(currentInvite).subscribe(
      res => {
        this.dialogRef.close('success');
        console.log(res)
        this.notificationService.emit(
          res.message,
          'success'
        );
      },
      error => {}
    ));
  }
  closeInviteGroupMembersDialog(): void {
    this.dialogRef.close();
  }
}
