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
import { RequestLoanDialogComponent } from './request-loan-dialog/request-loan-dialog.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { LoanRequestComponent } from './loan-request/loan-request.component';
import { AddDepositComponent } from './add-deposit/add-deposit.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    WithdrawalComponent,
    DepositComponent,
    PayableComponent,
    RequestLoanDialogComponent,
    LoanRequestComponent,
    AddDepositComponent
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
  entryComponents: [RequestLoanDialogComponent,AddDepositComponent],
  providers: [CdkColumnDef]
})
export class TransactionsModule {}
