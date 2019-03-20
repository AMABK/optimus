import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
// import { LoginComponent } from '@workshop/ui-login';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  // { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
  // { path: 'projects', loadChildren: './projects/projects.module#ProjectsModule' },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
