import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SettingComponent } from './setting/setting.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from 'projects/material/src/public_api';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRippleModule } from '@angular/material/core';
import { ListMessagesComponent } from './list-messages/list-messages.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { ThreadMessagesComponent } from './thread-messages/thread-messages.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [UserComponent, SettingComponent, NotificationComponent,ProfileComponent, ListMessagesComponent, ThreadMessagesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    MatTabsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatRippleModule
  ]
})
export class UserModule { }
