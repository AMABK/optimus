import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './insights.component';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [InsightsComponent],
  imports: [CommonModule, InsightsRoutingModule, MatTabsModule]
})
export class InsightsModule {}
