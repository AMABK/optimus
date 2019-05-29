import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { DepositComponent } from './deposit/deposit.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatDatepickerModule, MatNativeDateModule, MatSortModule, MatCardModule, MatPaginatorModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TransactionsComponent, WithdrawalComponent,DepositComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    TransactionsRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MaterialModule,
    MatCardModule,
    MatPaginatorModule
  ]
})
export class TransactionsModule {}
