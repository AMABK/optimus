import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user/user';

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