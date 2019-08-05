import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { AddGroupContributionComponent } from './add-group-contribution/add-group-contribution.component';

@NgModule({
  declarations: [AddGroupDetailsComponent, AddGroupContributionComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
