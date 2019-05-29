import { Component, OnInit, ViewChild } from "@angular/core";
import { Subject } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepositService } from '../../http/deposit/deposit.service';
import * as moment from 'moment';

@Component({
  selector: "app-withdrawal",
  templateUrl: "./withdrawal.component.html",
  styleUrls: ["./withdrawal.component.css"]
})
export class WithdrawalComponent implements OnInit {
  searchTerm$ = new Subject<any>();
  paginationData: any;
  pFromDate = "";
  pToDate = "";
  sFromDate = "";
  sToDate = "";
  search = "";
  verified = "";
  debitType = "";
  paymentStatus = "";
  depositDataSource;
  txn_type = -1;
  displayedColumns: string[] = [
    "position",
    "contribution_type.type_name",
    "amount",
    "paid",
    "payment_mode.bank",
    "payment_date",
    "created_at",
    "verified"
  ];
  statuses = [
    { value: "", display: "Verified Status" },
    { value: "yes", display: "Yes" },
    { value: "no", display: "No" }
  ];
  paymentStatuses = [
    { value: "", display: "Payment Status" },
    { value: "paid", display: "Paid" },
    { value: "unpaid", display: "Unpaid" }
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(private depositService: DepositService) {}
  ngOnInit() {
    this.depositService.search(this.searchTerm$, "-1").subscribe(response => {
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
    });
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
        this.debitType = query;
        break;
      case "paymentStatus":
        this.search = "";
        this.paymentStatus = query;
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
      txnType: this.txn_type,
      paymentStatus: this.paymentStatus,
      debitType: this.debitType
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
  paginate() {
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
      txnType: this.txn_type,
      page: pageIndex + 1,
      size: pageSize
    });
  }
  numberWithCommas(value: number = 0) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
}
