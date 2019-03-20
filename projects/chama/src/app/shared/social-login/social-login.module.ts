import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'projects/material/src/public_api';
import { SocialLoginComponent } from './social-login.component';

@NgModule({
  declarations: [SocialLoginComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ SocialLoginComponent]
})
export class SocialLoginModule { }
