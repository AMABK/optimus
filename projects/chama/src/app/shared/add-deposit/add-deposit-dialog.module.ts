import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'projects/material/src/public_api';
import { AddDepositDialogComponent } from './add-deposit-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddDepositDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatDatepickerModule,
    MatDialogModule,
  ]
})
export class AddDepositDialogModule { }
