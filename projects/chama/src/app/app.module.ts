import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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
import { FlexLayoutModule } from "@angular/flex-layout";
import { TokenInterceptorService } from 'projects/token-interceptor/src/public_api';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AuthComponent,
    PasswordResetComponent,
    SidenavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    HeaderModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    LoginModule,
    SpinnerModule,
    MatTreeModule,
    SidenavModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
