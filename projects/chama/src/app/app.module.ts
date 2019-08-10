import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppComponent } from './app.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './layout/header/header.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from 'projects/auth/src/public_api';
import { ErrorInterceptorService } from 'projects/error/src/public_api';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SidenavModule } from './shared/sidenav/sidenav.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TokenInterceptorService } from 'projects/token-interceptor/src/public_api';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { SpinnerComponent } from './spinner/spinner.component';
import { InputFieldComponent } from './shared/input-field/input-field.component';
import { GroupComponent } from './group/group.component';
import { RequestJoinGroupComponent } from './shared/request-join-group/request-join-group.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectSearchComponent } from './shared/mat-select-search/mat-select-search.component';
import { MatSelectSearchModule } from './shared/mat-select-search/mat-select-search.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    PasswordResetComponent,
    SidenavComponent,
    SpinnerComponent,
    InputFieldComponent,
    RequestJoinGroupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MaterialModule,
    HeaderModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    MatTreeModule,
    SidenavModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatDialogModule,
    MatSelectSearchModule
  ],
  providers: [
    AuthGuard,
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
  entryComponents: [RequestJoinGroupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
