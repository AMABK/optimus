import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { DepositComponent } from './deposit/deposit.component';

@NgModule({
  declarations: [TransactionsComponent, WithdrawalComponent,DepositComponent],
  imports: [CommonModule, TransactionsRoutingModule]
})
export class TransactionsModule {}
