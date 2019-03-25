import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';

@NgModule({
  declarations: [AddGroupDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
