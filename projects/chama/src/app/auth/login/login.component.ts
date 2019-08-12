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
  userRegister = { email: '', password: '', confirmPassword: '', firstName: '', lastName: '' };
  userReset = { email: '' };
  loading = false;
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Auth;
  showLoginForm = true;
  showResetForm = false;
  showRegisterForm = false;
  showResetCodeForm = false;
  formTitle = 'Login | Register'
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
          this.authService.socialLogin(JSON.parse(params["authData"]))
            .subscribe(authData => {
              if (authData && authData.access_token) {
                this.router.navigate(['/home']);
              }
            });
        }
      }
    });
  }
  ngOnDestroy() {
  }
  ngOnInit() {
    //console.log(this.route.snapshot.parent.url[0].path)
    this.routeTo = this.route.snapshot.queryParams.returnUrl || 'people';
    if (this.authService.currentUserValue) {
      this.router.navigate(['/home']);
    }

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
    window.location.href = environment.apiUrl + "/login/fb";
  }
  twitterLogin() {
    window.location.href = environment.apiUrl + "/login/tw";
  }
  linkedinLogin() {
    window.location.href = environment.apiUrl + "/login/li";
  }
  googleLogin() {
    window.location.href = environment.apiUrl + "/login/go";
  }
  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }
  login() {
    this.authService.getClientSecret(environment.apiUrl, environment.clientId, environment.hostUrl).subscribe(result => {
      const clientId = result.client_id;
      const clientSecret = result.client_secret;
      this.authService.login(environment.apiUrl + '/api/oauth/token', this.userLogin.email, this.userLogin.password, clientId, clientSecret)
        .subscribe(authData => {
          if (authData && authData.access_token) {
            this.router.navigate(['/home']);
          }
        }, error => {
          this.showLogin()
        });
    });

  }
  register() {
    console.log(this.userRegister.email)
    const user = {
      apiUrl: environment.apiUrl,
      email: this.userRegister.email,
      first_name: this.userRegister.firstName,
      last_name: this.userRegister.lastName,
      password_confirmation: this.userRegister.confirmPassword,
      password: this.userRegister.password
    }
    this.authService.register(user)
      .subscribe(res => {
        this.showLogin();
        this.notificationService.emit('Account created. Please check your email for confirmation message', 'success');
      }, error => {
        this.showRegister()
      });
  }
  reset() {
    this.authService.getClientSecret(environment.apiUrl, environment.clientId, environment.hostUrl).subscribe(result => {
      const clientId = result.client_id;
      const clientSecret = result.client_secret;
      this.authService.login(environment.apiUrl + '/api/oauth/token', this.userRegister.email, this.userRegister.password, clientId, clientSecret)
        .subscribe(res => {
          this.showResetCode()
        }, error => {
          this.showReset()
        });
    });
  }
  resetCode() {
    this.authService.getClientSecret(environment.apiUrl, environment.clientId, environment.hostUrl).subscribe(result => {
      const clientId = result.client_id;
      const clientSecret = result.client_secret;
      this.authService.login(environment.apiUrl + '/api/oauth/token', this.userRegister.email, this.userRegister.password, clientId, clientSecret)
        .subscribe(authData => {
          if (authData && authData.access_token) {
            this.router.navigate(['/home']);
          }
        }, error => {
          this.showResetCode()
        });
    });
  }

  showRegister() {
    this.formTitle = 'Login | Register';
    this.showLoginForm = false;
    this.showResetForm = false;
    this.showRegisterForm = true;
    this.showResetCodeForm = false;
  }
  showReset() {
    this.formTitle = 'Reset Password'
    this.showLoginForm = false;
    this.showResetForm = true;
    this.showRegisterForm = false;
    this.showResetCodeForm = false;
  }
  showLogin() {
    this.formTitle = 'Login | Register';
    this.showLoginForm = true;
    this.showResetForm = false;
    this.showRegisterForm = false;
    this.showResetCodeForm = false;
  }
  showResetCode() {
    this.formTitle = 'Reset Password';
    this.showLoginForm = false;
    this.showResetForm = false;
    this.showRegisterForm = false;
    this.showResetCodeForm = true;
  }
}
