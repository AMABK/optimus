import { Component, OnInit, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RequestExitGroupComponent } from './request-exit-group/request-exit-group.component';
import { InviteGroupMembersComponent } from './invite-group-members/invite-group-members.component';
import { ChamaService } from '../http/chama/chama.service';
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user/user';
import { AddGroupPaymentDetailsComponent } from './add-group-payment-details/add-group-payment-details.component';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { Chama } from '../models/chama/chama';
import { DepositService } from '../http/deposit/deposit.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { RequestJoinGroupComponent } from '../shared/request-join-group/request-join-group.component';
import { NotificationService } from 'projects/notification/src/public_api';
import { UserService } from '../http/user/user.service';
import { AddGroupTransactionTypeComponent } from '../shared/add-group-transaction-type/add-group-transaction-type.component';
export interface PeriodicElement1 {
  position: number;
  weight: number;
  symbol: string;
  payment: string;
  submission: string;
  verified: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  inviteCode: string;
  private searchTerm$ = new Subject<any>();
  subscriptions: Subscription[] = [];
  @Output() queryEvt = new EventEmitter<any>();
  depositColumns: string[] = [
    'position',
    'bank',
    'type_name',
    'amount',
    'payment_date',
    'created_at',
    'verified'
  ];
  @ViewChild('lineChart', { static: true }) private chartRef;
  chart: any;
  deposits: any = [];
  depositData;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  @ViewChild('searchRef', { static: true }) searchRef;
  pFromDate = '';
  pToDate = '';
  sFromDate = '';
  sToDate = '';
  search = '';
  verified = '';
  paginationData: any;
  @ViewChild(AddGroupDetailsComponent, { static: true }) child;
  statuses = [
    { value: '', display: 'Verified Status' },
    { value: 'yes', display: 'Yes' },
    { value: 'no', display: 'No' }
  ];
  txnTypeColumns: string[] = [
    'position',
    'name',
    'txn_type',
    'created_at',
    'status',
    'more'
  ];
  txnTypes = [];
  chamas$: Observable<Chama>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  defaultGroup: any;
  editGroup = true;
  user$: Observable<User>;
  displayedColumns: string[] = ['name', 'address', 'default', 'request'];
  user: any = {
    id: null
  };
  LineChart: any = [];
  private chamaSubject: BehaviorSubject<User>;
  chama$: Observable<User>;
  private pieChartLabels: string[] = [
    'Pending',
    'InProgress',
    'OnHold',
    'Complete',
    'Cancelled'
  ];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType = 'pie';
  public pieChartOptions: any = {
    backgroundColor: ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB']
  };
  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private chamaService: ChamaService,
    private depositService: DepositService,
    private authService: AuthService,
    private loaderIService: LoaderInterceptorService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.authService.currentUser.subscribe(x => {
      if (x !== null) {
        this.defaultDataLoad();
      }
    });
    // this.getDefaultChamaDetails();
  }

  // ngAfterViewInit() {
  // }
  // events on slice click
  public chartClicked(e: any): void {
    // console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    // console.log(e);
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
        this.getDefaultChamaDetails();
      }
    });
  }
  ngOnInit() {
    this.defaultDataLoad();
  }
  defaultDataLoad() {
    this.getDefaultChamaDetails();
    if (this.authService.getUserData().user.default_chama == null) {
      this.openRequestJoinGroupDialog();
    }

    this.depositService.getAllTransactionTypes().subscribe(res => {
      this.txnTypes = res.data;
    });
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  formatDateInput(date) {
    if (date === '' || date == null) {
      return '';
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format('YYYY-MM-DD');
    return formattedDate;
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
      case 'verified':
        this.search = '';
        this.verified = query;
        break;
      default:
        break;
    }
    this.pFromDate = query === '' ? '' : this.formatDateInput(this.pFromDate);
    this.pToDate = query === '' ? '' : this.formatDateInput(this.pToDate);
    this.sFromDate = query === '' ? '' : this.formatDateInput(this.sFromDate);
    this.sToDate = query === '' ? '' : this.formatDateInput(this.sToDate);
    this.searchTerm$.next({
      q: this.search,
      pFromDate: this.pFromDate,
      pToDate: this.pToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      verified: this.verified
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.pFromDate = '';
    this.pToDate = '';
    this.sFromDate = '';
    this.sToDate = '';
    this.verified = '';
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
    const verified = this.verified;
    this.searchTerm$.next({
      q: query,
      pFromDate,
      pToDate,
      sFromDate,
      sToDate,
      verified,
      page: pageIndex + 1,
      size: pageSize
    });
  }
  getChamas(userId) {
    const url = environment.apiUrl + '/api/chama?user_id=' + userId;
    return this.chamaService.all(url);
  }
  getDefaultChamaDetails() {
    this.authService.updateLoadingDataStatus(true);
    const authData = this.authService.getUserData();
    this.chamas$ = this.getChamas(this.authService.getUserId());

    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      // update default chama

      if (authData.user.chama_id == null) {
        if (result.chama_id != null) {
          authData.user.default_chama = result.default_chama;
          authData.user.chama_id = result.chama_id;
        } else {
          authData.user.default_chama = {};
          authData.user.chama_id = null;
        }
      } else {
        if (result.chama_id == null) {
          authData.user.chama_id = null;
          authData.user.default_chama = {};
        } else {
          authData.user.default_chama = result.default_chama;
          authData.user.chama_id = result.chama_id;
        }
      }
      this.chamaSubject = new BehaviorSubject<User>(result);
      this.user = this.chamaSubject.value;
      this.chama$ = this.chamaSubject.asObservable();

      const user = {
        user_id: authData.user.id,
        chama_id: authData.user.chama_id
      };
      this.userService.getChamaUserPermissionsList(user).subscribe(res => {
        authData.user.roles = res.data;
        this.authService.storeResult(authData);
        this.authService.updateLoadingDataStatus(false);
      });
    });
  }

  updateDefaultChama(chamaId, chamaName) {
    const currentChamaId = this.authService.getUserData().user.chama_id;
    // allow change only if the chama id has changed
    if (currentChamaId !== chamaId) {
      this.defaultGroup = this.chamaService
        .updateDefaultChama(chamaId)
        .subscribe(result => {
          this.router.navigate(['home']);
          this.authService.updateDefaultChama(chamaId);
          this.getDefaultChamaDetails();
          this.notificationService.emit('Default group / chama switched to ' + chamaName, 'success');
        });
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  openAddGroupDetails(status = 'create') {
    this.subscription.add(this.chamaService.getDefaultChamaDetails().subscribe(result => {
      let modalData = {};
      // alert(result)
      if ((result.default_chama === null) || (status === 'create')) {
        modalData = {
          id: null,
          name: '',
          address: '',
          phone_number: '',
          email: '',
          location: '',
          description: ''
        };
      } else {
        modalData = result.default_chama;
      }
      const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
        height: 'auto',
        width: '600px',
        data: {
          key: modalData
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        if (res === 'success') {
          this.getDefaultChamaDetails();
          this.router.navigate(['home']);
          // set message to be emitted by loader interceptor after http requests end
          this.loaderIService.storeNotificationMessage(
            'Chama successfully updated!',
            'success'
          );
        }
      });
    }));
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
    dialogRef.afterClosed().subscribe(res => {
      if (res === 'success') {
        this.defaultDataLoad();
        this.notificationService.emit(
          'Transaction type successfully added',
          'success'
        );
      }
    });
  }

  openRequestExitGroupDialog() {
    const dialogRef = this.dialog.open(RequestExitGroupComponent, {
      height: 'auto',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
  openInviteGroupMembersDialog() {
    const dialogRef = this.dialog.open(InviteGroupMembersComponent, {
      height: 'auto',
      width: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openAddPaymentDetails(chamaId) {
    const result = {
      modal: 'Add',
      chama_id: chamaId,
      bank: '',
      country: '',
      account_no: '',
      description: ''
    };
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: result
      }
    });
    dialogRef.afterClosed().subscribe(res => { 
      this.getDefaultChamaDetails();
      if (res === 'success') {
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage(
          'Payment method successfully added',
          'success'
        );
      }
    });
  }
  openEditPaymentDetails(payment, chamaName) {
    payment.chamaName = chamaName;
    payment.modal = 'Edit';
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: 'auto',
      width: '600px',
      data: {
        key: payment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDefaultChamaDetails();
      // console.log(`Dialog result: ${result}`);
    });
  }
  // openAddGroupTransactionDialog() {
  //   const depositTypes = [
  //     { id: 1, type_name: 'Savings' },
  //     { id: 2, type_name: 'Fines' },
  //     { id: 3, type_name: 'Trip' },
  //     { id: 4, type_name: 'CSR' }
  //   ];
  //   let dChama: any;
  //   this.chama$.subscribe(res => {
  //     dChama = res;
  //   });
  //   const dialogRef = this.dialog.open(AddGroupTransactionComponent, {
  //     height: 'auto',
  //     width: '600px',
  //     data: {
  //       depositTypes,
  //       group: dChama.default_chama
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === 'success') {
  //       this.getDefaultChamaDetails();
  //       // set message to be emitted by loader interceptor after http requests end
  //       this.loaderIService.storeNotificationMessage(
  //         'Chama successfully updated!',
  //         'success'
  //       );
  //     }
  //   });
  // }
  tabPosition(key) {
    const position = Number(key) + 1;
    return position;
  }
  numberWithCommas(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  userHasRole(role) {
    return this.authService.userHasRole(role);
  }
  generateGroupInviteCode() {
    const retVal = confirm('This will invalidate any previous invite code!. Do you want to continue ?');
    if (retVal === true) {
      if (this.authService.getUserData().user.chama_id != null) {
        const invite = {
          chama_id: this.authService.getUserData().user.chama_id
        };
        this.subscription.add(this.chamaService.generateGroupInviteCode(invite).subscribe(res => {
          const authData = this.authService.getUserData();
          authData.user.invite_code = res.data;
          this.authService.storeResult(authData);
          this.notificationService.emit('Group Invite Code successfully updated', 'success');
        }, error => {
          this.notificationService.emit(error.message.message);
        }));
      } else {
        this.notificationService.emit('Please set default group first');
      }
    } else {
      this.notificationService.emit('Request cancelled successfully', 'warning');
    }
  }
  clearGroupInviteCode() {
    const retVal = confirm('This will invalidate any previous invite code!. Do you want to continue ?');
    if (retVal === true) {
      const authData = this.authService.getUserData();
      authData.user.invite_code = null;
      this.authService.storeResult(authData);
    } else {

    }
  }
  viewGroupInviteCode() {
    const chamaId = this.authService.getUserData().user.chama_id;
    if (chamaId != null) {
      this.subscription.add(this.chamaService.getGroupInviteCode(chamaId).subscribe(res => {
        this.inviteCode = res.data;
        alert('Group Invite Code: ' + this.inviteCode);
      }));
    } else {
      alert('Group Invite Code: Not Set');
    }
  }
}
