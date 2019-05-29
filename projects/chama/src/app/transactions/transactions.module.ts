import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsComponent } from './transactions.component';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { DepositComponent } from './deposit/deposit.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
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
