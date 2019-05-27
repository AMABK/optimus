import { NgModule } from '@angular/core';
import { DisputesComponent } from './disputes.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public_api'; 

const routes: Routes = [
  {
    path: '',
    component: DisputesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisputesRoutingModule { }
