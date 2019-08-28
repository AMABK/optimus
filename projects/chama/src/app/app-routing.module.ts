import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/auth/src/public_api';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./transactions/transactions.module').then(
        m => m.TransactionsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'insights',
    loadChildren: () =>
      import('./insights/insights.module').then(m => m.InsightsModule)
  },
  {
    path: 'disputes',
    loadChildren: () =>
      import('./disputes/disputes.module').then(m => m.DisputesModule)
  },
  {
    path: 'group',
    loadChildren: () =>
      import('./group/group.module').then(m => m.GroupModule)
  },
  {
    path: 'admin/users',
    loadChildren: () =>
      import('./admin/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'admin/groups',
    loadChildren: () =>
      import('./admin/groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then(m => m.UserModule)
  },
  // { path: "login", component: LoginComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
