import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuardService as AuthGuard } from 'projects/auth/src/public_api';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'home'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
