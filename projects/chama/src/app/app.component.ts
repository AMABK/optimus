import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { ROUTER_ANIMATION } from './router-animations';
import { NotificationService } from 'projects/notification/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ROUTER_ANIMATION]
})
export class AppComponent implements OnInit {
  title = 'Chama App';
  isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;

  links = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/customers', icon: 'face', label: 'Customers' },
    { path: '/projects', icon: 'work', label: 'Projects' }
  ];

  constructor(
    private ns: NotificationService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  prepareRouterState(router: RouterOutlet) {
    return router.activatedRouteData['animation'] || 'initial';
  }

  isSidenaveOpen(component, authentication) {
    return component.opened && authentication;
  }
}
