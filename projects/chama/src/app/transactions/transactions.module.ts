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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PayableComponent } from './payable/payable.component';
import { RequestDebitDialogComponent } from './request-debit-dialog/request-debit-dialog.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DebitRequestComponent } from './debit-request/debit-request.component';
import { AddDepositDialogComponent } from './add-deposit/add-deposit-dialog.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    WithdrawalComponent,
    DepositComponent,
    PayableComponent,
    RequestDebitDialogComponent,
    DebitRequestComponent,
    AddDepositDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    TransactionsRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MaterialModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  entryComponents: [RequestDebitDialogComponent,AddDepositDialogComponent],
  providers: [CdkColumnDef]
})
export class TransactionsModule {}
