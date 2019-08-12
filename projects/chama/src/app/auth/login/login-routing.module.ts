import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthGuard } from 'projects/auth/src/public_api';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'password-reset/find/:token',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
