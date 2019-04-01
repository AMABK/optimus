import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { User } from './models/user/user';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Chama App";
  currentUser: User;
  links = [
    { path: "/home", icon: "home", label: "Home" },
    { path: "/customers", icon: "face", label: "Customers" },
    { path: "/projects", icon: "work", label: "Projects" }
  ];

  constructor(
    private ns: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  prepareRouterState(router: RouterOutlet) {
    return router.activatedRouteData["animation"] || "initial";
  }

  isSidenaveOpen(component, authentication) {
    if (authentication) {
      return true;
    }

    return component.opened && authentication;
  }
}
