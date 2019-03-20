import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);

  constructor(private http: HttpClient, private notificationService: NotificationService) {
    this.setToken(this.getToken());
  }

  getUrl(url) {
    return `${url}`;
  }

  login(url, email, password) {
    return this.http.post(this.getUrl(url), { email, password});
  }

  logout() {
    this.setToken('');
    // Display success message
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

  getToken() {
    return localStorage.getItem('token');
  }
}
