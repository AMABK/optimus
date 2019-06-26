import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user/user';
import { UserService } from '../../http/user/user.service';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { ExportPdf } from 'projects/export-pdf/src/public-api';

const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'gender',
    'email',
    'phone',
    'chama',
    'status',
    'created_at',
    'chamas'
  ];
  dataSource = ELEMENT_DATA;
  searchTerm$ = new Subject<any>();
  paginationData: any;
  gender = '';
  cFromDate = '';
  cToDate = '';
  search = '';
  verified = '';
  download = '';
  userDataSource;
  statuses = [
    { value: '', display: 'Status' },
    { value: '0', display: 'Unverified' },
    { value: '1', display: 'Verified' },
    { value: '2', display: 'Suspended' },
    { value: '3', display: 'Deactivated' },
  ];
  sexes = [
    {value: '', display: 'Gender'},
    {value: 'male', display: 'Male'},
    {value: 'female', display: 'Female'}
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  pageEvent: PageEvent;
  constructor(private userService: UserService, private exportPdf: ExportPdf) { }

  ngOnInit() {
    this.userService.searchUser(this.searchTerm$).subscribe(response => {
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
    });
  }
  handleSearch(query: string, model: string) {
    switch (model) {
      case 'search':
        // General search can only be done in exclusivity
        this.clearSearch();
        this.search = query;
        break;
      case 'gender':
        this.search = '';
        this.gender = query;
        break;
      case 'download':
        this.download = 'download';
        break;
      case 'cFromDate':
        this.search = '';
        this.cFromDate = query;
        break;
      case 'cToDate':
        this.search = '';
        this.cToDate = query;
        break;
      case 'verified':
        this.search = '';
        this.verified = query;
        break;
      default:
        break;
    }
    this.cFromDate = query === '' ? '' : this.formatDateInput(this.cFromDate);
    this.cToDate = query === '' ? '' : this.formatDateInput(this.cToDate);
    this.searchTerm$.next({
      q: this.search,
      gender: this.gender,
      cFromDate: this.cFromDate,
      cToDate: this.cToDate,
      verified: this.verified,
      download: this.download
    });
    this.paginator.pageIndex = 0;
  }
  clearSearch(activate = null) {
    this.gender = '';
    this.cFromDate = '';
    this.cToDate = '';
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
    const gender =
      this.gender === '' ? '' : this.formatDateInput(this.gender);
    const cFromDate =
      this.cFromDate === '' ? '' : this.formatDateInput(this.cFromDate);
    const cToDate =
      this.cToDate === '' ? '' : this.formatDateInput(this.cToDate);
    const verified = this.verified;
    this.searchTerm$.next({
      q: query,
      gender,
      cFromDate,
      cToDate,
      verified,
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
  userChama(userId) {
    // get user details
  }
  downloadPDF(pdfdata) {
        const data = [];
        let subData = [];
        let x = 0;
        for (const item of pdfdata) {
          subData = [];
          subData.push(x);
          subData.push(item.first_name + ' ' + item.last_name);
          subData.push(item.email);
          subData.push(item.gender);
          subData.push(item.phone);
          subData.push(item.address);
          if (item.default_chama == null) {
            subData.push('-');
          } else {
            subData.push(item.default_chama.name);
          }
          subData.push(item.chamas.length);
          data.push(subData);
          x++;
        }
        const head = ['No.', 'Name', 'Email', 'Gender', 'Phone No.', 'Address', 'Default Group', 'No. Of Reg Groups'];
        this.exportPdf.createPDF(data, head, 'landscape');
  }
}
