import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../http/user/user.service';
import { Subscription } from 'rxjs';
import { FormControl, FormArray, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-permissions-dialog',
  templateUrl: './permissions-dialog.component.html',
  styleUrls: ['./permissions-dialog.component.css']
})
export class PermissionsDialogComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  roles= [];
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<PermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private userService: UserService, private formBuilder: FormBuilder,private notificationService:NotificationService) { 
    this.form = this.formBuilder.group({
      roles: new FormArray([], this.minSelectedCheckboxes(1))
    });
    }
  private addCheckboxes() {
    this.roles.map((o, i) => {
      const control = new FormControl(o.checked ===true); // if first item set to true, else false
      (this.form.controls.roles as FormArray).push(control);
    });
  }
 minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}
  ngOnInit() {
    this.subscription.add(this.userService.getChamaUserPermissions(this.data).subscribe(res => {
      this.roles = res.data.roles;
      this.addCheckboxes();
    }));
  }
  updateRoles() {
    const selectedRoleIds = this.form.value.roles
      .map((v, i) => v ? this.roles[i].id : null)
      .filter(v => v !== null);
    const role = {
      role_ids: selectedRoleIds,
      user_id: this.data.user_id,
      chama_id: this.data.chama_id
      
    }
    this.userService.updateChamaUserPermissions(role).subscribe(res => {
      this.notificationService.emit('User permissions successfully updated', 'success');
      this.dialogRef.close('success');
    }, error => {
        this.dialogRef.close('fail');
        this.notificationService.emit('User permissions could not be successfully updated', 'danger');        
   })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
  onNoClick(): void {
    this.dialogRef.close('success');
  }
}
