import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    LandingRoutingModule]
  ,
})
export class LandingModule {}
