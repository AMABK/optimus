import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestExitGroupComponent } from './request-exit-group/request-exit-group.component';
import { InviteGroupMembersComponent } from './invite-group-members/invite-group-members.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { AddGroupPaymentDetailsComponent } from './add-group-payment-details/add-group-payment-details.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddDepositDialogComponent } from '../shared/add-deposit/add-deposit-dialog.component';
import { AddDepositDialogModule } from '../shared/add-deposit/add-deposit-dialog.module';



@NgModule({
  declarations: [
    HomeComponent,
    AddGroupDetailsComponent,
    RequestExitGroupComponent,
    InviteGroupMembersComponent,
    AddGroupPaymentDetailsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    MatDialogModule,
    MatStepperModule,
    MatTabsModule,
    MatRadioModule,
    MatPaginatorModule,
    RichTextEditorAllModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatAutocompleteModule,
    AddDepositDialogModule
  ],
  entryComponents: [
    AddGroupDetailsComponent,
    InviteGroupMembersComponent,
    RequestExitGroupComponent,
    AddGroupPaymentDetailsComponent,
    AddDepositDialogComponent
  ],
  providers: [CdkColumnDef]
})
export class HomeModule {}
