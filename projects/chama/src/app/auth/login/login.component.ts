import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'projects/auth/src/public_api';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { NotificationService } from 'projects/notification/src/public_api';
import { environment } from 'projects/chama/src/environments/environment';


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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private notificationService: NotificationService
  ) {  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('returnUrl') !== '') {
      this.notificationService.emit('Please login first to access this page', 'warning');
    }
    if (this.authService.getToken() !== null) {
      this.router.navigate(['/home']);
    }
  }

  login(email: string, password: string) {
    this.loading = true;
    const url = environment.apiUrl + '/api/oauth/token';
    this.authService.login(url, email, password).subscribe(result => {
      // Store the token
      this.authService.storeResult(JSON.stringify(result));
      // tslint:disable-next-line:no-string-literal
      this.authService.setToken(result['access_token']);
      // Redirect to home
      this.router.navigate(['home']);
      this.loading = false;
      // Display success message
      this.notificationService.emit(
        'Welcome to Chama App',
        'success'
      );
    });
  }
}
