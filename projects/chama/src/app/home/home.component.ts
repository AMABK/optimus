import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialog } from '@angular/material';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  openAddGroupDetails() {
    const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
      height: 'auto',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
