import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth } from 'projects/chama/src/app/models/auth/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;
  token: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    const userData = JSON.parse(localStorage.getItem('authData'));
    this.currentUserSubject = new BehaviorSubject<Auth>(userData);
    this.currentUser = this.currentUserSubject.asObservable();
    
  }
  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }
  getUrl(url) {
    return `${url}`;
  }

  login(url: string, email: string, password: string) {
    return this.http
      .post<Auth>(`${url}`, {
        username: email,
        password: password,
        client_id: '3',
        client_secret: 'OvehxOzBdiSlrEgYSonBvHGAGqVaooV9brfFOYCe',
        grant_type: 'password',
        scope: ''
      })
      .pipe(
        map(authData => {
          // console.log(authData);
          if (authData && authData.access_token) {
            this.storeResult(authData);
            this.currentUserSubject.next(authData);
          }
          return authData;
        })
      );
  }

  requestImplicitGrantToken(url) {
    return this.http.get(
      `${url}/api/oauth/authorize?client_id=4&redirect_uri=http://localhost:8000/callback&response_type=token&scope`
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authData');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  storeResult(authData) {
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  getToken() {
    return this.getUserData().access_token;
  }
  getUserId() {
    return this.getUserData().user['id'];
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('authData'));
  }
}
