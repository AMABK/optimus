import { Component, Input, ChangeDetectionStrategy, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { Auth } from '../../models/auth/auth';
import { AddDepositDialogComponent } from '../../shared/add-deposit/add-deposit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'projects/notification/src/public_api';
import { AddGroupTransactionTypeComponent } from '../../shared/add-group-transaction-type/add-group-transaction-type.component';
import { RequestJoinGroupComponent } from '../../shared/request-join-group/request-join-group.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() sidenav;
  defaultChamaName: string;

  //@Output() logout = new EventEmitter();
  @Input() userData;
  currentUser: Auth;
  currentRoute: any;
  loadingStatus: boolean;
  messageCount;
  constructor(
    private authService: AuthService,
    private cdRef: ChangeDetectorRef, 
    private dialog: MatDialog,
    private notificationService: NotificationService
  ) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }
  ngOnInit() {
    this.authService.loadingData.subscribe(loadingStatus => {
      this.loadingStatus = loadingStatus;
      this.cdRef.detectChanges();
    });
  }
  logout() {
    this.authService.logout();
  }
  openRequestJoinGroupDialog(): void {
    const dialogRef = this.dialog.open(RequestJoinGroupComponent, {
      width: '400px',
      data: {

      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        //this.authService.updateCurrentUserSubject();
      }
    });
  }
  openAddGroupTransactionTypes() {
    const defaultChama = {
      name:
        this.authService.getUserData().user.default_chama != null
          ? this.authService.getUserData().user.default_chama.name
          : null,
      id: this.authService.getUserData().user.chama_id
    };
    const dialogRef = this.dialog.open(AddGroupTransactionTypeComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: defaultChama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.notificationService.emit(
          'Contribution type successfully added',
          'success'
        );
      }
    });
  }
  openAddGroupDepositDialog() {
    const authData = this.authService.getUserData();
    const defaultChama = {
      name:
        authData.user.default_chama != null
          ? authData.user.default_chama.name
          : null,
      chamaId: authData.user.chama_id,
      depositBy: 'admin',
      user: {
        userId: authData.user.id,
        userName: authData.user.first_name + ' ' + authData.user.last_name
      }
    };
    const dialogRef = this.dialog.open(AddDepositDialogComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: defaultChama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
      }
    });
  }
  userHasRole(role) {
    return this.authService.userHasRole(role);
  }
}

