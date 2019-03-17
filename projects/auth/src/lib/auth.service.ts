import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
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
