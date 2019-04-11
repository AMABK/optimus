import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { Auth } from '../../models/auth/auth';

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() sidenav;
  //@Output() logout = new EventEmitter();
  @Input() userData;
  currentUser: Auth;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe(user => (this.currentUser = user));
  }
  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}

