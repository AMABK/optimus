import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    MatListModule
  ],
  exports: [ ]
})
export class SidenavModule { }
