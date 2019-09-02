import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { AddDepositDialogModule } from '../../shared/add-deposit/add-deposit-dialog.module';
import { AddDepositDialogComponent } from '../../shared/add-deposit/add-deposit-dialog.component';
import { AddGroupTransactionTypeComponent } from '../../shared/add-group-transaction-type/add-group-transaction-type.component';
import { AddGroupTransactionTypeModule } from '../../shared/add-group-transaction-type/add-group-transaction-type.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule,
    MaterialModule,
    RouterModule,
    MatProgressBarModule,
    MatBadgeModule,
    AddDepositDialogModule,
    AddGroupTransactionTypeModule
  ],
  exports: [
    HeaderComponent,
  ],
  entryComponents: [AddDepositDialogComponent, AddGroupTransactionTypeComponent]
})
export class HeaderModule {
}
