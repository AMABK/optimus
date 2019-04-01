import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { NotificationService } from 'projects/notification/src/public_api';
import { environment } from 'projects/chama/src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../../models/user/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
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
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private notificationService: NotificationService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    // if (this.route.snapshot.paramMap.get('redirectUrl') !== '') {
    //   this.notificationService.emit(
    //     'Please login first to access this page',
    //     'warning'
    //   );
    // }
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/home']);
    }
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(email: string, password: string) {
    this.loading = true;
    this.authService.login(environment.apiUrl + '/api/oauth/token', email, password)
      .pipe()
      .subscribe(authData => {
        if (authData && authData.access_token) {
          sessionStorage.setItem(
            "currentUser",
            JSON.stringify(authData)
          );
          this.currentUserSubject.next(authData);
        }
        this.router.navigate(['/home']);
        this.loading = false;
      });
  
  }
}
