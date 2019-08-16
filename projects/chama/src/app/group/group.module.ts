import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'projects/material/src/public_api';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PermissionsDialogComponent } from './permissions-dialog/permissions-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListUsersComponent } from './list-users/list-users.component';
import { AddDepositDialogComponent } from '../shared/add-deposit/add-deposit-dialog.component';
import { AddDepositDialogModule } from '../shared/add-deposit/add-deposit-dialog.module';

@NgModule({
  declarations: [GroupComponent, UsersComponent, PermissionsDialogComponent, ListUsersComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatTabsModule,
    MaterialModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    FormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AddDepositDialogModule
  ],
  entryComponents: [PermissionsDialogComponent, AddDepositDialogComponent]
})
export class GroupModule { }
