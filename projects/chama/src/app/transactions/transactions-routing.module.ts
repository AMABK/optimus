import { NgModule } from '@angular/core';
import { AuthGuard } from 'projects/auth/src/public_api';
import { TransactionsComponent } from './transactions.component';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawalComponent } from './withdrawal/withdrawal.component';
import { DepositComponent } from './deposit/deposit.component';
import { PayableComponent } from './payable/payable.component';
import { DebitRequestComponent } from './debit-request/debit-request.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    canActivate: [AuthGuard],
    data: {
      animation: 'transactions'
    }
  },
  {
    path: 'deposit',
    component: DepositComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'payable',
    component: PayableComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'withdrawal',
    component: WithdrawalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'debit-request',
    component: DebitRequestComponent,
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule {}
