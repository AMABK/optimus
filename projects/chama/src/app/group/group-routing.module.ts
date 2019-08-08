import { NgModule } from '@angular/core';
import { GroupComponent } from './group.component';
import { AuthGuard } from 'projects/auth/src/public_api';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    canActivate: [AuthGuard],
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
