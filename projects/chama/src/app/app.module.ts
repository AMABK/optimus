import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './layout/header/header.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from 'projects/auth/src/public_api';
import { ErrorInterceptorService } from 'projects/error/src/public_api';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { AuthComponent } from './auth/auth.component';
import { LoginModule } from './auth/login/login.module';
import { SpinnerModule } from './spinner/spinner.module';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SidenavModule } from './shared/sidenav/sidenav.module';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('G156777402651-s4irll2nan9nfl03dgcvfhrod8iijo3f.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('Facebook-App-Id')
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider('LinkedIn-client-Id', false, 'en_US')
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [AppComponent, FooterComponent, AuthComponent, PasswordResetComponent, SidenavComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    HeaderModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    LoginModule,
    SocialLoginModule,
    SpinnerModule,
    MatTreeModule,
    SidenavModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
