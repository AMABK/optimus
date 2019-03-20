import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/material/src/public_api';
import { LoginComponent } from './login.component';
import { SocialLoginComponent } from '../../shared/social-login/social-login.component';
import { SpinnerModule } from '../../spinner/spinner.module';


export const uiLoginRoutes: Route[] = [];

@NgModule({
  declarations: [
    LoginComponent,
    SocialLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    SpinnerModule
  ],
  entryComponents: [
    LoginComponent
  ],
  exports: [
    LoginComponent,
    SocialLoginComponent
  ]
})
export class LoginModule {}
