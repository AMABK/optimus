import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: "home", loadChildren: "./home/home.module#HomeModule" },
  {
    path: "transactions",
    loadChildren: "./transactions/transactions.module#TransactionsModule"
  },
  {
    path: "insights",
    loadChildren: "./insights/insights.module#InsightsModule"
  },
  {
    path: "disputes",
    loadChildren: "./disputes/disputes.module#DisputesModule"
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
