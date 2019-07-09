import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { RequestExitGroupComponent } from './request-exit-group/request-exit-group.component';
import { InviteGroupMembersComponent } from './invite-group-members/invite-group-members.component';
import { ChamaService } from '../http/chama/chama.service';
import { Observable, of, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user/user';
import { AddGroupPaymentDetailsComponent } from './add-group-payment-details/add-group-payment-details.component';
import { AddGroupContributionTypeComponent } from './add-group-contribution-type/add-group-contribution-type.component';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';
import * as Chart from 'chart.js';
import { AddGroupContributionComponent } from './add-group-contribution/add-group-contribution.component';
import { Chama } from '../models/chama/chama';
import { DepositService } from '../http/deposit/deposit.service';
import * as moment from 'moment';
export interface PeriodicElement1 {
  position: number;
  weight: number;
  symbol: string;
  payment: string;
  submission: string;
  verified: string;
}
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  searchTerm$ = new Subject<any>();
  subscriptions: Subscription[] = [];
  @Output() queryEvt = new EventEmitter<any>();
  depositColumns: string[] = [
    "position",
    "bank",
    "type_name",
    "amount",
    "payment_date",
    "created_at",
    "verified"
  ];
  //dataSource = ELEMENT_DATA;
  @ViewChild("lineChart", { static: true }) private chartRef;
  chart: any;
  deposits: any = [];
  depositData;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  @ViewChild("searchRef", { static: true }) searchRef;
  pFromDate = "";
  pToDate: string = "";
  sFromDate: string = "";
  sToDate: string = "";
  search: string = "";
  verified: string = "";
  paginationData: any;
  @ViewChild(AddGroupDetailsComponent, { static: true }) child;
  statuses = [
    { value: "", display: "Verified Status" },
    { value: "yes", display: "Yes" },
    { value: "no", display: "No" }
  ];
  contributionColumns: string[] = [
    "position",
    "amount",
    "type",
    "date",
    "verified"
  ];
  chamas$: Observable<Chama>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  defaultGroup: any;
  editGroup = true;
  user$: Observable<User>;
  displayedColumns: string[] = ["name", "address", "default", "request"];
  user: any = {
    id: null
  };
  LineChart: any = [];
  private chamaSubject: BehaviorSubject<User>;
  public chama: Observable<User>;
  public pieChartLabels: string[] = [
    "Pending",
    "InProgress",
    "OnHold",
    "Complete",
    "Cancelled"
  ];
  public pieChartData: number[] = [21, 39, 10, 14, 16];
  public pieChartType = "pie";
  public pieChartOptions: any = {
    backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"]
  };
  constructor(
    public dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private chamaService: ChamaService,
    private depositService: DepositService,
    private authService: AuthService,
    private loaderIService: LoaderInterceptorService
  ) {
    // this.getDefaultChamaDetails();
  }

  ngAfterViewInit() {
    this.getDefaultChamaDetails();
  }
  // events on slice click
  public chartClicked(e: any): void {
    // console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    // console.log(e);
  }
  ngOnInit() {
    this.depositService.search(this.searchTerm$).subscribe(response => {
      this.paginationData = {
        current_page: response.data.current_page - 1,
        total: response.data.total,
        per_page: response.data.per_page
      };
      this.deposits = new MatTableDataSource(response.data.data);
      this.depositData = this.deposits;
      if (this.depositData.data) {
        this.depositData.sort = this.sort;
      }
    });
    this.getDefaultChamaDetails();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ["", Validators.required]
    });
    this.chamas$ = this.getChamas(this.authService.getUserId());
    
    // Line chart:
    this.LineChart = new Chart("lineChart", {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        datasets: [
          {
            label: "Total contributions(KES)",
            data: [9, 7, 3, 5, 2, 10, 15, 16, 19, 3, 1, 9],
            fill: false,
            lineTension: 0.2,
            borderColor: "red",
            borderWidth: 1
          },
          {
            label: "Total saving(KES)",
            data: [0, 7, 3, 4, 2, 18, 5, 16, 1, 3, 1, 9],
            fill: false,
            lineTension: 0.2,
            borderColor: "green",
            borderWidth: 1
          },
          {
            label: "Other Ccontributions(KES)",
            data: [8, 6, 3, 9, 2, 10, 15, 16, 19, 9, 1, 0],
            fill: false,
            lineTension: 0.2,
            borderColor: "blue",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
          text: "Line Chart",
          display: true
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
  formatDateInput(date) {
    if (date === "" || date == null) {
      return "";
    }
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    return formattedDate;
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
      verified: this.verified
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
      page: pageIndex + 1,
      size: pageSize
    });
  }
  getChamas(userId) {
    const url = environment.apiUrl + "/api/chama?user_id=" + userId;
    return this.chamaService.all(url);
  }
  getDefaultChamaDetails() {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      // update default chama
      let authData = this.authService.getUserData();
      authData.user = {
        chama_id: result.chama_id
      };
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
      this.authService.storeResult(authData);

      this.chamaSubject = new BehaviorSubject<User>(result);
      this.user = this.chamaSubject.value;
      this.chama = this.chamaSubject.asObservable();
    });
  }
  updateDefaultChama(chamaId) {
    const currentChamaId = this.authService.getUserData().user.chama_id;
    // allow change only if the chama id has changed
    if (currentChamaId !== chamaId) {
      this.defaultGroup = this.chamaService
        .updateDefaultChama(chamaId)
        .subscribe(result => {
          this.getDefaultChamaDetails();
        });
    }
  }
  ngOnDestroy() {
    //this.chamas$.unsubscribe();
  }
  openAddGroupDetails(status = 'create') {
    this.chamaService.getDefaultChamaDetails().subscribe(result => {
      let modalData = {};
     // alert(result)
      if ((result.default_chama == null)||(status=='create')) {
        modalData = {
          id: null,
          name: "",
          address: "",
          phone_number: "",
          email: "",
          location: "",
          description: ""
        };
      } else {
        modalData = result.default_chama;
      }
      const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
        height: "auto",
        width: "600px",
        data: {
          key: modalData
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result === "success") {
          this.chamas$ = this.getChamas(this.authService.getUserId());
          this.getDefaultChamaDetails();
          // set message to be emitted by loader interceptor after http requests end
          this.loaderIService.storeNotificationMessage(
            "Chama successfully updated!",
            "success"
          );
        }
      });
    });
  }
  openAddGroupContributionTypes() {
    const defaultChama = {
      name:
        this.authService.getUserData().user.default_chama != null
          ? this.authService.getUserData().user.default_chama.name
          : null,
      id: this.authService.getUserData().user.chama_id
    };

    const dialogRef = this.dialog.open(AddGroupContributionTypeComponent, {
      height: "auto",
      width: "600px",
      data: {
        key: defaultChama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.chamas$ = this.getChamas(this.authService.getUserId());
        this.getDefaultChamaDetails();
        this.loaderIService.storeNotificationMessage(
          "Contribution type successfully added",
          "success"
        );
      }
    });
  }

  openRequestExitGroupDialog() {
    const dialogRef = this.dialog.open(RequestExitGroupComponent, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openInviteGroupMembersDialog() {
    const dialogRef = this.dialog.open(InviteGroupMembersComponent, {
      height: "auto",
      width: "600px"
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  openAddPaymentDetails() {
    const result = {
      modal: "Add",
      bank: "",
      country: "",
      description: ""
    };
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: "auto",
      width: "600px",
      data: {
        key: result
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.chamas$ = this.getChamas(this.authService.getUserId());
      this.getDefaultChamaDetails();
      if (result === "success") {
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage(
          "Payment method successfully added",
          "success"
        );
      }
    });
  }
  openEditPaymentDetails(payment, chamaName) {
    payment.chamaName = chamaName;
    payment.modal = "Edit";
    const dialogRef = this.dialog.open(AddGroupPaymentDetailsComponent, {
      height: "auto",
      width: "600px",
      data: {
        key: payment
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.chamas$ = this.getChamas(this.authService.getUserId());
      this.getDefaultChamaDetails();
      // console.log(`Dialog result: ${result}`);
    });
  }
  openAddGroupContributionDialog() {
    const depositTypes = [
      { id: 1, type_name: "Savings" },
      { id: 2, type_name: "Fines" },
      { id: 3, type_name: "Trip" },
      { id: 4, type_name: "CSR" }
    ];
    let dChama: any;
    this.chama.subscribe(res => {
      dChama = res;
    });
    const dialogRef = this.dialog.open(AddGroupContributionComponent, {
      height: "auto",
      width: "600px",
      data: {
        depositTypes,
        group: dChama.default_chama
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === "success") {
        this.chamas$ = this.getChamas(this.authService.getUserId());
        this.getDefaultChamaDetails();
        // set message to be emitted by loader interceptor after http requests end
        this.loaderIService.storeNotificationMessage(
          "Chama successfully updated!",
          "success"
        );
      }
    });
  }
  tabPosition(key) {
    const position = Number(key) + 1;
    return position;
  }
  numberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
