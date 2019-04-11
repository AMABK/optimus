import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'projects/material/src/public_api';
import { LoginComponent } from './login.component';
import { MatFormFieldModule, MatCardModule } from '@angular/material';


export const uiLoginRoutes: Route[] = [];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    MatFormFieldModule,
    MatCardModule
  ],
  entryComponents: [LoginComponent],
  exports: [LoginComponent],
  providers: []
})
export class LoginModule {}
