import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'projects/material/src/public_api';
import { AddGroupTransactionTypeComponent } from './add-group-transaction-type.component';

@NgModule({
  declarations: [AddGroupTransactionTypeComponent],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AddGroupTransactionTypeModule {}
