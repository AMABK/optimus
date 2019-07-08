import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,
    MaterialModule,
    RouterModule,
    MatProgressBarModule,
    MatBadgeModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule {
}
