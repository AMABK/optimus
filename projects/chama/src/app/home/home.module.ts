import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [HomeComponent, AddGroupDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule
  ],
  entryComponents: [AddGroupDetailsComponent]
})
export class HomeModule {}
