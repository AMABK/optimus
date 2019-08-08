import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ExportPdf } from 'projects/export-pdf/src/public-api';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { User } from '../../models/user/user';
import { UserService } from '../../http/user/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PermissionsDialogComponent } from '../permissions-dialog/permissions-dialog.component';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';

const ELEMENT_DATA: User[] = [];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  ngOnInit() {
    
  }
}