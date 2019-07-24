import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositService } from '../../http/deposit/deposit.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { RequestDebitDialogComponent } from '../request-debit-dialog/request-debit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../models/user/user';
import { ChamaService } from '../../http/chama/chama.service';
import { AuthService } from 'projects/auth/src/public_api';
import { AddDepositDialogComponent } from '../add-deposit/add-deposit-dialog.component';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { ChangeDepositStatusComponent } from '../change-deposit-status/change-deposit-status.component';

export interface PeriodicElement {
  position:number
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
export class DepositComponent implements OnInit {
  searchTerm$ = new Subject<any>();
  paginationData: any;
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
    { value: "no", display: "No" }
  ];
  private chamaSubject: BehaviorSubject<User>;
  public chama: Observable<User>;
  user: any = {
    id: null
  };
  aggregates = {
    total: 0,
    average: 0,
    minimum: 0,
    maximum:0
  };
  depositTypes;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(
    private depositService: DepositService,
    public dialog: MatDialog,
    private chamaService: ChamaService,
    private authService: AuthService,
    private exportPdf: ExportPdf
  ) { }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.searchTerm$.unsubscribe();
  }
  ngOnInit() {
    this.depositService.getContributionType('deposit', null).subscribe(result => {
      this.depositTypes = result;
    });
    this.getDefaultChamaDetails();
    this.getDefaultChamaDeposits();
  
  }
  handleSearch(query: string, model: string) {
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
        //alert(model)
        //this.search = "";
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
      download: this.download
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
    dialogRef.afterClosed().subscribe(result => {});
  }
  getDefaultChamaDetails() {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
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
      //this.authService.storeResult(authData);

      this.chamaSubject = new BehaviorSubject<User>(result);
      this.user = this.chamaSubject.value;
      this.chama = this.chamaSubject.asObservable();
    });
  }
  getDefaultChamaDeposits() {
    this.depositService
      .search(this.searchTerm$, "deposit")
      .subscribe(response => {
        if (this.download != 'download') {
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
      });
  }
  openAddGroupContributionDialog() {
    // const depositTypes = [
    //   { id: 1, type_name: "Savings" },
    //   { id: 2, type_name: "Fines" },
    //   { id: 3, type_name: "Trip" },
    //   { id: 4, type_name: "CSR" }
    // ];
    let dChama: any;
    this.chama.subscribe(res => {
      dChama = res;
    });
    const dialogRef = this.dialog.open(AddDepositDialogComponent, {
      height: "auto",
      width: "600px",
      data: {
        depositTypes:this.depositTypes,
        group: dChama.default_chama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.getDefaultChamaDeposits()
        // this.chamas$ = this.getChamas(this.authService.getUserId());
        // this.getDefaultChamaDetails();
        // // set message to be emitted by loader interceptor after http requests end
        // this.loaderIService.storeNotificationMessage(
        //   "Chama successfully updated!",
        //   "success"
        // );
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
          subData.push(item.contribution_type.type_name );
          subData.push(this.numberWithCommas(item.amount));
          subData.push(item.payment_date);
          subData.push(item.created_at);
          subData.push(item.verified.toUpperCase());
          data.push(subData);
          x++;
        }
        const head = ['No.','Bank', 'Deposit Type', 'Amount', 'Payment Date', 'Submission Date', 'Verified'];
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
        this.getDefaultChamaDeposits();
      }
    });
  }
}
