import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, OnDestroy, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { DepositService } from '../http/deposit/deposit.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { ChamaService } from '../http/chama/chama.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit, OnDestroy {
  parentState: boolean = false;
  status = 0;
  txnTypeDataSource;
  invitesDataSource;
  searchTerm$ = new Subject<any>();
  displayedTypesColumns: string[] = [
    'position',
    'name',
    'deposit_type',
    'status',
    'created_at',
    'updated_at',
    'more'
  ];
  displayedInvitesColumns: string[] = [
    'position',
    'name',
    'chama',
    'created_by',
    'status',
    'created_at',
    'updated_at',
    'more'
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  @Output() selectedTabChange: EventEmitter<MatTabChangeEvent>;
  constructor(private chamaService: ChamaService,private authService: AuthService, private notificationService: NotificationService, private depositService : DepositService) { 

  }

  ngOnInit() {
    if (!this.userHasRole('group-admin')) {
      this.notificationService.emit('You have not been granted admin rights to access this page');
    }
    this.authService.currentUser.subscribe(x => {
      this.depositService.getAllTransactionTypes().subscribe(res => {
        this.txnTypeDataSource = new MatTableDataSource(res.data);
      });
      this.chamaService.getChamaMemberInvites(this.authService.getUserData().user.id).subscribe(res => {
        this.invitesDataSource = new MatTableDataSource(res.data.data);
      });
    });
   
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
