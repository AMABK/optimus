import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';

import { NotificationService } from 'projects/notification/src/public_api';
import { environment } from 'projects/chama/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../../models/auth/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  routeTo: string;
  filters = [
    'ig-xpro2',
    'ig-willow',
    'ig-walden',
    'ig-valencia',
    'ig-toaster',
    'ig-sutro',
    'ig-sierra',
    'ig-rise',
    'ig-nashville',
    'ig-mayfair',
    'ig-lofi',
    'ig-kelvin',
    'ig-inkwell',
    'ig-hudson',
    'ig-hefe',
    'ig-earlybird',
    'ig-brannan',
    'ig-amaro',
    'ig-1977'
  ];

  chosenFilter = this.filters[Math.floor(Math.random() * this.filters.length)];
  userLogin = { email: '', password: '' };
  loading = false;
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Auth;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
     this.route.queryParams.subscribe(params => {
       if (params["loginType"] === "social") {
         if (params["status"] === "error") {
           this.notificationService.emit(params["message"]);
         } else {
           this.authService.storeResult(JSON.parse(params["authData"]));
           //this.currentUserSubject.next((params["authData"]));
           //this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(params["authData"]));
           //this.currentUser = this.currentUserSubject.asObservable();
           this.authService.currentUser.subscribe(x => (this.currentUser = x));
           this.router.navigate(["/home"]);
         }
       }
     });
  }
  ngOnDestroy() {
  }
  ngOnInit() {
    this.routeTo = this.route.snapshot.queryParams.returnUrl || 'people';
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

  
  
    // if (this.route.snapshot.paramMap.get("loginType") == "social") {
    //   const authData = this.route.snapshot.paramMap.get("authData");
    //   alert(authData);
      
    //   //sessionStorage.setItem("currentUser", JSON.stringify(authData));
    //   // this.currentUserSubject.next(authData);

    //   this.router.navigate(["/home"]);
    // }
    // if (this.route.snapshot.paramMap.get('redirectUrl') !== '') {
    //   this.notificationService.emit(
    //     'Please login first to access this page',
    //     'warning'
    //   );
    // }
    if (this.currentUserSubject) {
     this.router.navigate(['/home']);
    }
  }
    ngAfterViewInit() {
    this.authService.currentUserSubject.subscribe(user => {
      this.router.navigate([this.routeTo]);
     // this.loading = false;
    });
  }
  facebookLogin() {
    window.location.href = environment.apiUrl +"/login/fb";
  }
  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    this.authService.getClientSecret(environment.apiUrl , environment.clientId, environment.hostUrl).subscribe(result => {
      const clientId = result.client_id;
      const clientSecret = result.client_secret;
      this.authService.login(environment.apiUrl + '/api/oauth/token', email, password, clientId, clientSecret)
        .pipe()
        .subscribe(authData => {
          if (authData && authData.access_token) { 
            // sessionStorage.setItem(
            //   "currentUser",
            //   JSON.stringify(authData)
            // );
           // this.currentUserSubject.next(authData);

            this.router.navigate(['/home']);
          }
        });
    });

  }
}
