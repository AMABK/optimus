import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatRadioModule, MatPaginatorModule, MatNativeDateModule } from '@angular/material';
import { RequestExitGroupComponent } from './request-exit-group/request-exit-group.component';
import { InviteGroupMembersComponent } from './invite-group-members/invite-group-members.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { AddGroupPaymentDetailsComponent } from './add-group-payment-details/add-group-payment-details.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { AddGroupContributionTypeComponent } from './add-group-contribution-type/add-group-contribution-type.component';
import { AddGroupContributionComponent } from './add-group-contribution/add-group-contribution.component';
import { MatDatepickerModule } from "@angular/material/datepicker";



@NgModule({
  declarations: [
    HomeComponent,
    AddGroupDetailsComponent,
    RequestExitGroupComponent,
    InviteGroupMembersComponent,
    AddGroupPaymentDetailsComponent,
    AddGroupContributionTypeComponent,
    AddGroupContributionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule,
    MatPaginatorModule,
    RichTextEditorAllModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    AddGroupDetailsComponent,
    InviteGroupMembersComponent,
    RequestExitGroupComponent,
    AddGroupPaymentDetailsComponent,
    AddGroupContributionTypeComponent,
    AddGroupContributionComponent
  ],
  providers: [CdkColumnDef]
})
export class HomeModule {}
