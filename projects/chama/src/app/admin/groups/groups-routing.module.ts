import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public_api';

const routes: Routes = [
  {
    path: '',
    component: GroupsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule {}
