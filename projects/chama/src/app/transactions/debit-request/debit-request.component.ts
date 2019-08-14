import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import { ChamaService } from '../../http/chama/chama.service';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { DebitService } from '../../http/debit/debit.service';
import { RequestDebitDialogComponent } from '../request-debit-dialog/request-debit-dialog.component';
import { ChangeDebitStatusComponent } from '../change-debit-status/change-debit-status.component';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-debit-request',
  templateUrl: './debit-request.component.html',
  styleUrls: ['./debit-request.component.css']
})
export class DebitRequestComponent implements OnInit,OnDestroy {
  subscription: Subscription = new Subscription();
  searchTerm$ = new Subject<any>();
  paginationData: any;
  asAdmin = 'no';
  aFromDate = '';
  aToDate = '';
  sFromDate = '';
  sToDate = '';
  search = '';
  verified = '';
  requestType = ''
  loanRequestDataSource;
  displayedColumns: string[] = [
    'position',
    'amount',
    'chama',
    'request_type',
    'payment_date',
    'created_at',
    'verified'
  ];
  statuses = [
    { value: '', display: 'Verified Status' },
    { value: '1', display: 'Yes' },
    { value: '0', display: 'No' },
    { value: '2', display: 'Rejected' }
  ];
  requestTypes = [
    { value: '', display: 'Request Type' },
    { value: 'withdrawal', display: 'Withdrawal' },
    { value: 'loan', display: 'Loan' }
  ];
  paymentStatuses = [
    { value: '', display: 'Payment Status' },
    { value: 'paid', display: 'Paid' },
    { value: 'unpaid', display: 'Unpaid' }
  ];
  download = '';
  aggregates = {
    total: 0,
    avg: 0,
    min: 0,
    max: 0
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(
    private debitService: DebitService,
    public dialog: MatDialog,
    private exportPdf: ExportPdf,
    private authService:AuthService
  ) { }
  ngOnInit() {
    this.getDebitRequests();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getDebitRequests() {
    this.subscription.add(this.debitService
      .searchDebitRequests(this.searchTerm$)
      .subscribe(response => {
        if (this.download !== 'download') {
          this.aggregates.total = response.data.sum;
          this.aggregates.avg = response.data.avg;
          this.aggregates.min = response.data.min;
          this.aggregates.max = response.data.max;
          this.paginationData = {
            current_page: response.data.current_page - 1,
            total: response.data.total,
            per_page: response.data.per_page
          };
          this.loanRequestDataSource = new MatTableDataSource(
            response.data.data
          );
          this.loanRequestDataSource.sortingDataAccessor = (item, property) => {
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
          this.loanRequestDataSource.sort = this.sort;
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
      case 'aFromDate':
        this.search = '';
        this.aFromDate = query;
        break;
      case 'download':
        this.download = 'download';
        break;
      case 'aToDate':
        this.search = '';
        this.aToDate = query;
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
      case 'requestType':
        this.search = '';
        this.requestType = query;
        break;
      case "asAdmin":
        this.asAdmin = query;
        if (query == 'yes') {
          this.displayedColumns = [
            'position',
            'name',
            'amount',
            'chama',
            'request_type',
            'payment_date',
            'created_at',
            'verified'
          ];
        } else {
          this.displayedColumns = [
            'position',
            'amount',
            'chama',
            'request_type',
            'payment_date',
            'created_at',
            'verified'
          ];
        }
      default:
        break;
    }
    this.aFromDate = query === '' ? '' : this.formatDateInput(this.aFromDate);
    this.aToDate = query === '' ? '' : this.formatDateInput(this.aToDate);
    this.sFromDate = query === '' ? '' : this.formatDateInput(this.sFromDate);
    this.sToDate = query === '' ? '' : this.formatDateInput(this.sToDate);
    this.searchTerm$.next({
      q: this.search,
      aFromDate: this.aFromDate,
      aToDate: this.aToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      verified: this.verified,
      requestType: this.requestType,
      download: this.download,
      asAdmin: this.asAdmin
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.aFromDate = '';
    this.aToDate = '';
    this.sFromDate = '';
    this.sToDate = '';
    this.verified = '';
    this.search = '';
    this.requestType = '';
    if (activate === 'activate') {
      this.handleSearch('', '');
    }
  }
  paginate($event) {
    this.pageEvent = $event;
    const pageIndex = this.pageEvent.pageIndex;
    const pageSize = this.pageEvent.pageSize;
    const query = this.search;
    const aFromDate =
      this.aFromDate === '' ? '' : this.formatDateInput(this.aFromDate);
    const aToDate =
      this.aToDate === '' ? '' : this.formatDateInput(this.aToDate);
    const sFromDate =
      this.sFromDate === '' ? '' : this.formatDateInput(this.sFromDate);
    const sToDate =
      this.sToDate === '' ? '' : this.formatDateInput(this.sToDate);
    const verified = this.verified;
    this.searchTerm$.next({
      q: query,
      aFromDate,
      aToDate,
      sFromDate,
      sToDate,
      verified,
      page: pageIndex + 1,
      size: pageSize,
      requestType: this.requestType,
      download: this.download,
      asAdmin: this.asAdmin
    });
  }
  numberWithCommas(value: number = 0) {
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
    if (this.loanRequestDataSource) {
      return this.loanRequestDataSource.data
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
        this.handleSearch(this.asAdmin, 'asAdmin');
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
      subData.push(this.numberWithCommas(item.amount));
      subData.push(item.payment_date);
      subData.push(item.created_at);
      subData.push(item.status);
      data.push(subData);
      x++;
    }
    const head = ['No.', 'Amount', 'Date Of Payment', 'Date Of Submission', 'Verified'];
    this.exportPdf.createPDF(data, head, 'landscape');
  }
  openChangeDebitStatusDialog(element): void {
    const dialogRef = this.dialog.open(ChangeDebitStatusComponent, {
      width: '400px',
      data: {
        element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'success') {
        this.handleSearch(this.asAdmin, 'asAdmin');
      }
    });
  }
  userHasRole(role) {
    return this.authService.userHasRole(role)
  }
}
