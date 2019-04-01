import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationService } from 'projects/notification/src/public_api';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from 'projects/chama/src/app/models/user/user';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  token: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(sessionStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
    const userData = JSON.parse(localStorage.getItem("authData"));
  }

  getUrl(url) {
    return `${url}`;
  }

  login(url: string, email: string, password: string) {
    return this.http
      .post<User>(`${url}`, {
        username: email,
        password: password,
        client_id: "4",
        client_secret: "DZlqHEjFDNESHnHakD4tzZA5N2vwzEq3RMPfY8Oy",
        grant_type: "password",
        scope: ""
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
    sessionStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  storeResult(authData) {
    sessionStorage.setItem("authData", JSON.stringify(authData));
  }

  getToken() {
    return this.getUserData().access_token;
  }
  getUserId() {
    return this.getUserData().user["id"];
  }
  getUserData() {
    return JSON.parse(sessionStorage.getItem("authData"));
  }
}
