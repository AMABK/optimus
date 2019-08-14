import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';
import { UserService } from '../../http/user/user.service';
import { NotificationService } from 'projects/notification/src/public_api';
import { User } from '../../models/user/user';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  user: any = [];
  public currentUserSubject: BehaviorSubject<any> = new BehaviorSubject([]);;
  public currentUser: Observable<User>;
  constructor(private authService: AuthService, private userService: UserService, private notificationService: NotificationService) { }
  firstName = new FormControl(this.authService.getUserData().user.first_name, [
    Validators.required]
  );
  middleName = new FormControl(this.authService.getUserData().user.middle_name, [
    Validators.required]
  );
  lastName = new FormControl(this.authService.getUserData().user.last_name, [
    Validators.required,
    Validators.required]
  );
  address = new FormControl(this.authService.getUserData().user.address, [
    Validators.required]
  );
  email = new FormControl(this.authService.getUserData().user.email, [Validators.required]
  );
  phoneNumber = new FormControl(this.authService.getUserData().user.phone_number, [
    Validators.required,
    Validators.minLength(8)]
  );
  gender = new FormControl(this.authService.getUserData().user.gender, [
    Validators.required]
  );
  currentPassword = new FormControl('', [
    Validators.required]
  );
  newPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)]
  );
  confirmNewPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)]
  );

  matcher = new FormErrorService();
  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmitUpdateProfile() {
    //console.log(this.firstName.value)
    if (this.firstName.valid && this.middleName.valid && this.lastName && this.phoneNumber.valid && this.gender.valid && this.email.valid && this.address.valid) {
      const user = {
        first_name: this.firstName.value,
        middle_name: this.middleName.value,
        last_name: this.lastName.value,
        address: this.address.value,
        phone_number: this.phoneNumber.value,
        gender: this.gender.value,
        email: this.email.value,
      };
      this.subscription.add(this.userService.updateUserProfile(user).subscribe(res => {
        let authData = this.authService.getUserData();
        authData.user.first_name = this.firstName.value;
        authData.user.last_name = this.lastName.value;
        authData.user.phone_number = this.phoneNumber.value;
        authData.user.middle_name = this.middleName.value;
        authData.user.address = this.address.value;
        authData.user.gender = this.gender.value;
        this.authService.storeResult(authData);
        this.notificationService.emit('Profile updated', 'success');
      }, error => {
        if (error.status === 403) {
          this.notificationService.emit(error.message.message, 'danger');
        } else {
          this.notificationService.emit('Profile updated failed');
        }
      }));
    }
  }
  onSubmitChangePassword() {
    if (this.currentPassword.valid && this.newPassword.valid && this.confirmNewPassword.valid) {
      const password = {
        current_password: this.currentPassword.value,
        new_password: this.newPassword.value,
        confirm_new_password: this.confirmNewPassword.value,
        user_id: this.authService.getUserData().user.id
      };
      this.userService.changePassword(password).subscribe(res => {
        console.log(res);
        this.notificationService.emit('Password changed', 'success');
      }, error => {
        if (error.status === 403) {
          this.notificationService.emit(error.message.message, 'danger');
        } else {
          this.notificationService.emit(error.message.message, 'danger');
        }
      })
    }
  }

}
