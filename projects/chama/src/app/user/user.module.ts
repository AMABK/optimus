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

@NgModule({
  declarations: [UserComponent, SettingComponent, NotificationComponent,ProfileComponent, ListMessagesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    MatTabsModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatChipsModule
  ]
})
export class UserModule { }
