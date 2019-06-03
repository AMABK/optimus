import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsightsRoutingModule } from './insights-routing.module';
import { InsightsComponent } from './insights.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'projects/material/src/public_api';

@NgModule({
  declarations: [InsightsComponent],
  imports: [CommonModule, InsightsRoutingModule, MatTabsModule, MaterialModule]
})
export class InsightsModule {}
