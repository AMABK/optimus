import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UserService } from '../../http/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  subscription: Subscription = new Subscription();
  @Input() userChamaStatus;
  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'phone',
    'address',
    'status',
    'created_at',
    'more'
  ];
  searchTerm$ = new Subject<any>();
  paginationData: any;
  pFromDate = '';
  pToDate = '';
  sFromDate = '';
  sToDate = '';
  search = '';
  status = '';
  userDataSource;
  download = '';
  txn_type = 'deposit';
  statuses = [
    { value: '', display: 'Verified Status' },
    { value: 'yes', display: 'Yes' },
    { value: 'no', display: 'No' }
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(private userService: UserService, private dialog: MatDialog, private exportPdf: ExportPdf, private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getChamaUsers();
  }
  getChamaUsers() {
    this.subscription.add(this.userService.searchChamaUsers(this.userChamaStatus, this.searchTerm$).subscribe(response => {
      if (this.download != 'download') {
        this.paginationData = {
          current_page: response.data.current_page - 1,
          total: response.data.total,
          per_page: response.data.per_page
        };
        this.userDataSource = new MatTableDataSource(response.data.data);
        this.userDataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'status':
              if (item.status === 0) {
                item.status = 'Unverified';
              }
              if (item.status === 1) {
                item.status = 'Verified';
              }
              if (item.status === 2) {
                item.status = 'Suspended';
              }
              return item.status;
            case 'chama':
              return item.default_chama.name;
            case 'name':
              return item.first_name + item.middle_name + item.last_name;
            default:
              return item[property];
          }
        };
        this.userDataSource.sort = this.sort;
      } else {
        this.downloadPDF(response.data);
        this.download = '';
      }
    }));
  }
  handleSearch(query: string, model: string) {
    switch (model) {
      case 'search':
        // General search can only be done in exclusivity
        this.clearSearch();
        this.search = query;
        break;
      case 'pFromDate':
        this.search = '';
        this.pFromDate = query;
        break;
      case 'download':
        this.download = 'download';
        break;
      case 'pToDate':
        this.search = '';
        this.pToDate = query;
        break;
      case 'sFromDate':
        this.search = '';
        this.sFromDate = query;
        break;
      case 'sToDate':
        this.search = '';
        this.sToDate = query;
        break;
      case 'status':
        this.search = '';
        this.status = query;
        break;
      default:
        break;
    }
    this.pFromDate = query === '' ? '' : this.formatDateInput(this.pFromDate);
    this.pToDate = query === '' ? '' : this.formatDateInput(this.pToDate);
    this.sFromDate = query === '' ? '' : this.formatDateInput(this.sFromDate);
    this.sToDate = query === '' ? '' : this.formatDateInput(this.sToDate);
    this.searchTerm$.next({
      download: this.download,
      q: this.search,
      pFromDate: this.pFromDate,
      pToDate: this.pToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      status: this.status,
      txnType: this.txn_type
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.pFromDate = '';
    this.pToDate = '';
    this.sFromDate = '';
    this.sToDate = '';
    this.status = '';
    this.search = '';
    if (activate === 'activate') {
      this.handleSearch('', '');
    }
  }
  paginate($event) {
    this.pageEvent = $event;
    const pageIndex = this.pageEvent.pageIndex;
    const pageSize = this.pageEvent.pageSize;
    const query = this.search;
    const pFromDate =
      this.pFromDate === '' ? '' : this.formatDateInput(this.pFromDate);
    const pToDate =
      this.pToDate === '' ? '' : this.formatDateInput(this.pToDate);
    const sFromDate =
      this.sFromDate === '' ? '' : this.formatDateInput(this.sFromDate);
    const sToDate =
      this.sToDate === '' ? '' : this.formatDateInput(this.sToDate);
    const status = this.status;
    this.searchTerm$.next({
      q: query,
      pFromDate,
      pToDate,
      sFromDate,
      sToDate,
      status,
      txnType: this.txn_type,
      page: pageIndex + 1,
      size: pageSize
    });
  }
  numberWithCommas(x: number) {
    if (x == null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  formatDateInput(date) {
    if (date === '' || date == null) {
      return '';
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format('YYYY-MM-DD');
    return formattedDate;
  }
  groupChama(userId) {
    // get user details
  }
  downloadPDF(pdfData) {
    const data = [];
    let subData = [];
    let x = 0;
    for (const item of pdfData) {
      subData = [];
      subData.push(x);
      subData.push(item.name);
      subData.push(item.email);
      subData.push(item.created_at);
      subData.push(item.phone_number);
      subData.push(item.address);
      data.push(subData);
      x++;
    }
    const head = [
      'No.',
      'Name',
      'Email',
      'created_at',
      'Phone No.',
      'Address'
    ];
    this.exportPdf.createPDF(data, head);
  }
  openPermissionsDialog(userId) {
    const dialogRef = this.dialog.open(PermissionsDialogComponent, {
      width: '500px',
      data: {
        user_id: userId,
        chama_id: this.authService.getUserData().user.chama_id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialogclosed');
    });
  }
  changeChamaUserStatus(userId, status) {
    const userChama = {
      user_id: userId,
      status,
      chama_id: this.authService.getUserData().user.chama_id
    }
    this.userService.changeChamaUserStatus(userChama).subscribe(res => {
      this.getChamaUsers();
      this.notificationService.emit('User status successfully update, ', 'success');
    }, error => {
      this.notificationService.emit('User status could not be successfully updated', 'danger');
    })
  }
  onTabChanged(event: MatTabChangeEvent) {
    if (event.index == 0) {
     // this.pollComponent.refresh();//Or whatever name the method is called
    }
    else {
     // this.surveyComponent.refresh(); //Or whatever name the method is called
    }
  }
}
