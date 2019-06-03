import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { User } from '../../models/user/user';
import { GroupService } from '../../http/group/group.service';
import { ExportPdf } from 'projects/export-pdf/src/public-api';

const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'location',
    'email',
    'phone',
    'address',
    'status',
    'created_at',
    'description'
  ];
  dataSource = ELEMENT_DATA;
  searchTerm$ = new Subject<any>();
  paginationData: any;
  pFromDate = '';
  pToDate = '';
  sFromDate = '';
  sToDate = '';
  search = '';
  verified = '';
  groupDataSource;
  download= '';
  txn_type = 'deposit';
  statuses = [
    { value: '', display: 'Verified Status' },
    { value: 'yes', display: 'Yes' },
    { value: 'no', display: 'No' }
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(private groupService: GroupService, private exportPdf: ExportPdf) {}

  ngOnInit() {
    this.groupService.searchGroup(this.searchTerm$).subscribe(response => {
      if (this.download != 'download') {
      this.paginationData = {
        current_page: response.data.current_page - 1,
        total: response.data.total,
        per_page: response.data.per_page
      };
      this.groupDataSource = new MatTableDataSource(response.data.data);
      this.groupDataSource.sortingDataAccessor = (item, property) => {
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
      console.log(response.data.data);
      this.groupDataSource.sort = this.sort;
    } else {
      this.downloadPDF(response.data);
      this.download = '';
    }
    });
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
      download: this.download,
      q: this.search,
      pFromDate: this.pFromDate,
      pToDate: this.pToDate,
      sFromDate: this.sFromDate,
      sToDate: this.sToDate,
      verified: this.verified,
      txnType: this.txn_type
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
  paginate() {
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
          subData.push(item.location);
          subData.push(item.phone_number);
          subData.push(item.address);
          data.push(subData);
          x++;
        }
    const head = [
      'No.',
          'Name',
          'Email',
          'Location',
          'Phone No.',
          'Address'
        ];
    this.exportPdf.createPDF(data, head);
  }
}
