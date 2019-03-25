import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  name: string;
  @Input() isLoggedIn;
  @Input() title: string;
  @Input() sidenav;
  @Output() logout = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) {  }
  ngOnInit() {
    this.getUser();
  }
  getUser() {
    let result = this.authService.getUserData();
    // tslint:disable-next-line: no-string-literal
    this.name = result['user']['first_name'] + ' ' + result['user']['last_name'];
  }
}

