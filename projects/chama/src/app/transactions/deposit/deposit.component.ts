import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositService } from '../../http/deposit/deposit.service';
import { Subject, Observable, BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { RequestDebitDialogComponent } from '../request-debit-dialog/request-debit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user/user';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { ChangeDepositStatusComponent } from '../change-deposit-status/change-deposit-status.component';
import { Router } from '@angular/router';
import { AddDepositDialogComponent } from '../../shared/add-deposit/add-deposit-dialog.component';

export interface PeriodicElement {
  position: number;
  bank: string;
  type_name: string;
  amount: number;
  payment_date: string;
  created_at: string;
  verified: string;
}
@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.css"]
})
export class DepositComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription()
  searchTerm$ = new Subject<any>();
  paginationData: any;
  asAdmin = "no";
  pFromDate = "";
  download = "";
  pToDate: string = "";
  sFromDate: string = "";
  sToDate: string = "";
  search: string = "";
  verified: string = "";
  txnType = "deposit";
  debitType = "";
  depositDataSource;
  displayedColumns: string[] = [
    "position",
    "payment_mode.bank",
    "contribution_type.type_name",
    "amount",
    "payment_date",
    "created_at",
    "verified"
  ];
  statuses = [
    { value: "", display: "Verified Status" },
    { value: "yes", display: "Yes" },
    { value: "no", display: "No" },
    { value: "rejected", display: "Rejected" }
  ];
  private chamaSubject: BehaviorSubject<User>;
  public chama: Observable<User>;
  user: any = {
    id: null
  };
  aggregates = {
    total: 0,
    avg: 0,
    min: 0,
    max: 0
  };
  depositTypes;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(
    private router: Router,
    private depositService: DepositService,
    public dialog: MatDialog,
    private chamaService: ChamaService,
    private authService: AuthService,
    private exportPdf: ExportPdf
  ) {
    this.authService.currentUser.subscribe(x => {
      this.defaultDataLoad();
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.defaultDataLoad();
  }
  defaultDataLoad() {
    console.log('loop');
    this.authService.updateLoadingDataStatus(true);
    this.subscription.add(this.depositService.getContributionType('deposit', null).subscribe(result => {
      this.depositTypes = result;
    }));
    this.getDefaultChamaDetails();
    this.getDefaultChamaDeposits();

  }
  handleSearch(query: string, model: string) {
    this.authService.updateLoadingDataStatus(true);
    switch (model) {
      case "search":
        // General search can only be done in exclusivity
        this.clearSearch();
        this.search = query;
        break;
      case "pFromDate":
        this.search = "";
        this.pFromDate = query;
        break;
      case "download":
        this.download = 'download';
        break;
      case "pToDate":
        this.search = "";
        this.pToDate = query;
        break;
      case "sFromDate":
        this.search = "";
        this.sFromDate = query;
        break;
      case "sToDate":
        this.search = "";
        this.sToDate = query;
        break;
      case "verified":
        this.search = "";
        this.verified = query;
        break;
      case "debitType":
        this.search = "";
        this.verified = query;
        break;
      case "asAdmin":
        this.asAdmin = query;
        if (query == 'yes') {
          this.displayedColumns = [
            "position",
            "name",
            "payment_mode.bank",
            "contribution_type.type_name",
            "amount",
            "payment_date",
            "created_at",
            "verified"
          ];
        } else {
          this.displayedColumns = [
            "position",
            "payment_mode.bank",
            "contribution_type.type_name",
            "amount",
            "payment_date",
            "created_at",
            "verified"
          ];
        }
        break;
      default:
        break;
    }
    this.pFromDate = query === "" ? "" : this.formatDateInput(this.pFromDate);
    this.pToDate = query === "" ? "" : this.formatDateInput(this.pToDate);
    this.sFromDate = query === "" ? "" : this.formatDateInput(this.sFromDate);
    this.sToDate = query === "" ? "" : this.formatDateInput(this.sToDate);
    this.searchTerm$.next({
      q: this.search,
      pFromDate: this.pFromDate,
      pToDate: this.pToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      verified: this.verified,
      txnType: this.txnType,
      debitType: this.debitType,
      download: this.download,
      asAdmin: this.asAdmin
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.pFromDate = "";
    this.pToDate = "";
    this.sFromDate = "";
    this.sToDate = "";
    this.verified = "";
    this.search = "";
    if (activate === "activate") {
      this.handleSearch("", "");
    }
  }
  paginate($event) {
    this.authService.updateLoadingDataStatus(true)
    this.pageEvent = $event;
    const pageIndex = this.pageEvent.pageIndex;
    const pageSize = this.pageEvent.pageSize;
    const query = this.search;
    const pFromDate =
      this.pFromDate === "" ? "" : this.formatDateInput(this.pFromDate);
    const pToDate =
      this.pToDate === "" ? "" : this.formatDateInput(this.pToDate);
    const sFromDate =
      this.sFromDate === "" ? "" : this.formatDateInput(this.sFromDate);
    const sToDate =
      this.sToDate === "" ? "" : this.formatDateInput(this.sToDate);
    const verified = this.verified;
    this.searchTerm$.next({
      q: query,
      pFromDate,
      pToDate,
      sFromDate,
      sToDate,
      asAdmin: this.asAdmin,
      verified,
      txnType: this.txnType,
      debitType: this.debitType,
      page: pageIndex + 1,
      size: pageSize
    });
  }
  numberWithCommas(x: number) {
    if (x == null) {
      return 0;
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  formatDateInput(date) {
    if (date === "" || date == null) {
      return "";
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
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
      height: "auto",
      width: "600px",
      data: {
        requestType,
        key: ""
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.router.navigate(['/transactions/debit-request']);
      }
    });
  }
  getDefaultChamaDetails() {
    this.subscription.add(this.chamaService.getDefaultChamaDetails().subscribe(result => {
      // update default chama
      const authData = this.authService.getUserData();
      authData.user.chama_id = result.chama_id;
      if (authData.user.chama_id === null) {
        if (result.chama_id != null) {
          authData.user.default_chama = {
            id: result.chama_id,
            name: result.default_chama.name
          };
        } else {
          authData.user.default_chama = {};
        }
      } else {
        if (result.chama_id == null) {
          authData.user.default_chama = {};
        } else {
          authData.user.default_chama.name = result.default_chama.name;
        }
      }

      this.chamaSubject = new BehaviorSubject<User>(result);
      this.user = this.chamaSubject.value;
      this.chama = this.chamaSubject.asObservable();
    }));
  }
  getDefaultChamaDeposits() {
    this.authService.updateLoadingDataStatus(true);
    this.subscription.add(this.depositService
      .search(this.searchTerm$, "deposit")
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
          this.depositDataSource = new MatTableDataSource(response.data.data);
          this.depositDataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "contribution_type.type_name":
                return item.contribution_type.type_name;
              case "payment_mode.bank":
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
        this.authService.updateLoadingDataStatus(false)
      }));
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
      height: "auto",
      width: "600px",
      data: {
        key: defaultChama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.getDefaultChamaDeposits();
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
      subData.push(item.contribution_type.type_name);
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
  openChangeDepositStatusDialog(element): void {
    const dialogRef = this.dialog.open(ChangeDepositStatusComponent, {
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
