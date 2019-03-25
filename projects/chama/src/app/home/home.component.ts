import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';
import { MatDialog } from '@angular/material';
import { AddGroupDetailsComponent } from './add-group-details/add-group-details.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

const ELEMENT_DATA = [
  { position: 1, name: 'Royals Self Help Group', weight: '21st Nov, 2017', symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  defaultGroup = true;
  editGroup = true;
  displayedColumns: string[] = ['position', 'name', 'weight', 'select', 'request'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  openAddGroupDetails() {
    const dialogRef = this.dialog.open(AddGroupDetailsComponent, {
      height: 'auto',
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
