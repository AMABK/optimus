import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'projects/auth/src/public_api';
import { FormControl, Validators } from '@angular/forms';
import { FormErrorService } from 'projects/form-error/src/public_api';
import { AddGroupDetailsComponent } from '../../home/add-group-details/add-group-details.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-join-group',
  templateUrl: './request-join-group.component.html',
  styleUrls: ['./request-join-group.component.css']
})
export class RequestJoinGroupComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, public dialogRef: MatDialogRef<RequestJoinGroupComponent>, public addGroup: MatDialogRef<AddGroupDetailsComponent>) { }
  matcher = new FormErrorService;
  group = new FormControl("", [Validators.required]);
  ngOnInit() {
  
  }
  onSubmit() {
    
  }
  closeRequestJoinGroup(){
    this.dialogRef.close();
    this.router.navigate(['home'], { queryParams: { addGroup: 'success' } });
  }

}
