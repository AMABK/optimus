import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositService } from '../../http/deposit/deposit.service';
import * as moment from 'moment';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { RequestDebitDialogComponent } from '../request-debit-dialog/request-debit-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.css']
})
export class WithdrawalComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  protected searchTerm$ = new Subject<any>();
  paginationData: any;
  asAdmin = 'no';
  pFromDate = '';
  pToDate = '';
  sFromDate = '';
  sToDate = '';
  search = '';
  verified = '';
  debitType = '';
  paymentStatus = '';
  depositDataSource;
  // tslint:disable-next-line: variable-name
  txn_type = 'withdrawal';
  displayedColumns: string[] = [
    'position',
    'contribution_type.type_name',
    'amount',
    'payment_mode.bank',
    'payment_date',
    'created_at',
    'verified'
  ];
  statuses = [
    { value: '', display: 'Verified Status' },
    { value: 'yes', display: 'Yes' },
    { value: 'no', display: 'No' }
  ];
  paymentStatuses = [
    { value: '', display: 'Payment Status' },
    { value: 'paid', display: 'Paid' },
    { value: 'unpaid', display: 'Unpaid' }
  ];
  aggregates = {
    total: 0,
    average: 0,
    minimum: 0,
    maximum: 0
  };
  download = '';
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private depositService: DepositService,
    private exportPdf: ExportPdf
  ) {
    this.authService.currentUser.subscribe(x => {
      if (x !== null) {
        this.defaultDataLoad();
      }
    });
  }
  ngOnInit() {
    this.defaultDataLoad();
  }
  defaultDataLoad() {
    this.authService.updateLoadingDataStatus(true);
    this.subscription.add(this.depositService
      .search(this.searchTerm$, 'withdrawal')
      .subscribe(response => {
        if (this.download !== 'download') {
          this.aggregates.total = response.data.sum;
          this.aggregates.average = response.data.avg;
          this.aggregates.minimum = response.data.min;
          this.aggregates.maximum = response.data.max;
          this.paginationData = {
            current_page: response.data.current_page - 1,
            total: response.data.total,
            per_page: response.data.per_page
          };
          this.depositDataSource = new MatTableDataSource(response.data.data);
          this.depositDataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case 'contribution_type.type_name':
                return item.contribution_type.type_name;
              case 'payment_mode.bank':
                if (item.payment_mode != null) {
                  return item.payment_mode.bank;
                }
                return null;
              default:
                return item[property];
            }
          };
          this.depositDataSource.sort = this.sort;
        } else {
          this.downloadPDF(response.data);
          this.download = '';
        }
        this.authService.updateLoadingDataStatus(false);
      }));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  handleSearch(query: string, model: string) {
    this.authService.updateLoadingDataStatus(true);
    switch (model) {
      case 'search':
        // General search can only be done in exclusivity
        this.clearSearch();
        this.search = query;
        break;
      case 'download':
        this.download = 'download';
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
      case 'debitType':
        this.search = '';
        this.debitType = query;
        break;
      case 'paymentStatus':
        this.search = '';
        this.paymentStatus = query;
        break;
      case 'asAdmin':
        this.asAdmin = query;
        if (query === 'yes') {
          this.displayedColumns = [
            'position',
            'name',
            'contribution_type.type_name',
            'amount',
            'payment_mode.bank',
            'payment_date',
            'created_at',
            'verified'
          ];
        } else {
          this.displayedColumns = [
            'position',
            'contribution_type.type_name',
            'amount',
            'payment_mode.bank',
            'payment_date',
            'created_at',
            'verified'
          ];
        }
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
      verified: this.verified,
      txnType: this.txn_type,
      paymentStatus: this.paymentStatus,
      debitType: this.debitType,
      download: this.download,
      asAdmin: this.asAdmin
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
    this.authService.updateLoadingDataStatus(true);
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
      txnType: this.txn_type,
      page: pageIndex + 1,
      size: pageSize,
      asAdmin: this.asAdmin
    });
  }
  numberWithCommas(value: number = 0) {
    if (value == null) {
      value = 0;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  formatDateInput(date) {
    if (date === '' || date == null) {
      return '';
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format('YYYY-MM-DD');
    return formattedDate;
  }
  /** Gets the total amount of all transactions. */
  getTotalAmount() {
    if (this.depositDataSource) {
      return this.depositDataSource.data
        .map(t => t.amount)
        .reduce((acc, value) => acc + value, 0);
    }
  }
  openRequestDebitDialog(requestType) {
    const dialogRef = this.dialog.open(RequestDebitDialogComponent, {
      height: 'auto',
      width: '600px',
      data: {
        requestType
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/transactions/debit-request']);
      }
    });
  }
  downloadPDF(pdfData) {
    const data = [];
    let subData = [];
    let x = 1;
    for (const item of pdfData) {
      subData = [];
      subData.push(x);
      if (item.payment_mode == null) {
        subData.push('-');
      } else {
        subData.push(item.payment_mode.bank);
      }
      if (item.contribution_type == null) {
        subData.push('-');
      } else {
        subData.push(item.contribution_type.type_name);
      }
      subData.push(this.numberWithCommas(item.amount));
      subData.push(item.payment_date);
      subData.push(item.created_at);
      subData.push(item.verified.toUpperCase());
      data.push(subData);
      x++;
    }
    const head = ['No.', 'Bank', 'Deposit Type', 'Amount', 'Payment Date', 'Submission Date', 'Verified'];
    this.exportPdf.createPDF(data, head, 'landscape');
  }
  userHasRole(role) {
    return this.authService.userHasRole(role);
  }
}
