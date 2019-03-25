import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.setToken(this.getToken());
  }

  getUrl(url) {
    return `${url}`;
  }

  login(url, email, password) {
    return this.http.post(this.getUrl(url), {
      username: email,
      password: password,
      client_id: '4',
      client_secret: 'DZlqHEjFDNESHnHakD4tzZA5N2vwzEq3RMPfY8Oy',
      grant_type: 'password',
      scope: ''
    });
  }
  // login1(url, email, password) {
  //   return this.http
  //     .post(this.getUrl(url), {
  //       username: email,
  //       password: password,
  //       client_id: "4",
  //       client_secret: 'DZlqHEjFDNESHnHakD4tzZA5N2vwzEq3RMPfY8Oy',
  //       grant_type: 'password',
  //       scope: ''
  //     })
  //     .pipe(
  //       map(response => {
  //         console.log(response);
  //         if (response && response.access_token) {
  //           sessionStorage.setItem('currentUser', JSON.stringify(response));
  //           this.currentUserSubject.next(response);
  //         }
  //         return response;
  //       })
  //     );
  // }

  logout() {
// tslint:disable-next-lin
    localStorage.clear();
    // Display success message
    this.router.navigate(["/home"]);
    this.notificationService.emit(
      'Successfully logged out of Chama App',
      'success'
    );
  }

  // TOKEN
  setToken(token) {
    localStorage.setItem('token', token);
    this.isAuthenticated$.next(token !== ''); // Could be more Robust
  }
  storeResult(authData) {
    localStorage.setItem('authData', authData);
  }

  getToken() {
    return localStorage.getItem('token');
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('authData'));
  }
}
