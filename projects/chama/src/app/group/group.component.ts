import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  parentState: boolean = false;
  status = 0;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  constructor(private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    if (!this.userHasRole('group-admin')) {
      this.notificationService.emit('You have not been granted admin rights to access this page');
    }
  }
  ngOnDestroy() {

  }
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.status = tabChangeEvent.index;
  }
  userHasRole(role) {
    return this.authService.userHasRole(role)
  }
}
