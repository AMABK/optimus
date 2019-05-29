import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: "home", loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  {
    path: "transactions",
    loadChildren: () => import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path: "insights",
    loadChildren: () => import('./insights/insights.module').then(m => m.InsightsModule)
  },
  {
    path: "disputes",
    loadChildren: () => import('./disputes/disputes.module').then(m => m.DisputesModule)
  },
  { path: "login", component: LoginComponent },
  { path: "**", redirectTo: "/home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
