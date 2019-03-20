import { Component, OnInit } from '@angular/core';
import { AuthService as SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  LinkedInLoginProvider
} from 'angularx-social-login';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.css']
})
export class SocialLoginComponent implements OnInit {
  constructor(private socialAuthService: SocialAuthService) {}

  ngOnInit() {}
  // signInWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // signInWithFB(): void {
  //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  // signInWithLinkedIn(): void {
  //   this.socialAuthService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  // }

  signOut(): void {
    //this.socialAuthService.signOut();
  }
}
