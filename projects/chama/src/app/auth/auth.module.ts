import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SocialLoginComponent } from '../shared/social-login/social-login.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, SocialLoginComponent],
  imports: [
    CommonModule,
  ],
  entryComponents: [AuthComponent],
  exports: [AuthComponent]
})
export class AuthModule {}
