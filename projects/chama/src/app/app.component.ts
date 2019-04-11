import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { NotificationService } from 'projects/notification/src/public_api';
import { Auth } from './models/auth/auth';
import { LoaderService } from 'projects/loader/src/public_api';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Chama App";
  currentUser: Auth;
  links = [
    { path: "/home", icon: "home", label: "Home" },
    { path: "/customers", icon: "face", label: "Customers" },
    { path: "/projects", icon: "work", label: "Projects" }
  ];

  constructor(
    public loaderService: LoaderService,
    private ns: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.currentUser.subscribe(x => (this.currentUser = x));
  }

  ngOnInit() {
    if (this.loaderService.isLoading.getValue()) {
      console.log(this.loaderService.isLoading.getValue());
    } else{
      console.log(this.loaderService.isLoading.getValue());
    }
  }

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
