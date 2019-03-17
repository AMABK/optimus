import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'projects/material/src/public_api';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
