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
import { MatTreeModule } from '@angular/material/tree';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SidenavModule } from './shared/sidenav/sidenav.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { TokenInterceptorService } from 'projects/token-interceptor/src/public_api';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { SpinnerComponent } from './spinner/spinner.component';
import { InputFieldComponent } from './shared/input-field/input-field.component';
import { WithdrawalComponent } from './transactions/withdrawal/withdrawal.component';
import { DepositComponent } from './transactions/deposit/deposit.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AuthComponent,
    PasswordResetComponent,
    SidenavComponent,
    SpinnerComponent,
    InputFieldComponent,
    WithdrawalComponent,
    DepositComponent
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
    MatTreeModule,
    SidenavModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    },
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
