import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }
  firstName = new FormControl(this.authService.getUserData().user.first_name, [
    Validators.required,
    Validators.minLength(4)]
  );
  middleName = new FormControl(this.authService.getUserData().user.middle_name, [
    Validators.required,
    Validators.minLength(4)]
  );
  lastName = new FormControl(this.authService.getUserData().user.last_name, [
    Validators.required,
    Validators.minLength(4)]
  );
  address = new FormControl(this.authService.getUserData().user.address, [
    Validators.required,
    Validators.minLength(4)]
  );
  email = new FormControl(this.authService.getUserData().user.email, [
    Validators.required,
    Validators.email]
  );
  phoneNumber = new FormControl(this.authService.getUserData().user.phone, [
    Validators.required,
    Validators.minLength(4)]
  );
  gender = new FormControl(this.authService.getUserData().user.gender, [
    Validators.required,
    Validators.minLength(4)]
  );
  currentPassword = new FormControl('', [
    Validators.required,
    Validators.minLength(6)]
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
  onSubmit() {
    
  }
  onSubmitChangePassword() {
    
  }

}
