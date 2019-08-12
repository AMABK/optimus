import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { Auth } from '../../models/auth/auth';
import { MessageService } from '../../http/message/message.service';

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
  defaultChamaName: string;
  //@Output() logout = new EventEmitter();
  @Input() userData;
  currentUser: Auth;
  currentRoute: any;
  messageCount;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService,private messageService:MessageService) {

  }
  ngOnInit() {
    // this.messageService.getChamaUserMessageCount().subscribe(res => {
    //   //this.messageCount = res.data;
    // })
    //this.defaultChamaName = JSON.parse(localStorage.getItem('authData')).user.default_chama.name;
  }
  ngAfterViewInit() {
    
  }
  logout() {
    this.authService.logout();
  }
}

