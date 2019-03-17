import { Component, OnInit } from '@angular/core';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
