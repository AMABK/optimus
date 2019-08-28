import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Auth } from 'projects/chama/src/app/models/auth/auth';
import { Client } from 'projects/chama/src/app/models/client/client';
import { LoaderInterceptorService } from 'projects/loader-interceptor/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;
  public loadingDataSubject: BehaviorSubject<boolean>;
  public loadingData: Observable<boolean>;
  token: string;
  constructor(
    private router: Router,
    private http: HttpClient,
    private loaderIService: LoaderInterceptorService
  ) {
    const userData = JSON.parse(localStorage.getItem('authData'));
    this.currentUserSubject = new BehaviorSubject<Auth>(userData);
    this.currentUser = this.currentUserSubject.asObservable();
    this.loadingDataSubject = new BehaviorSubject<boolean>(false);
    this.loadingData = this.loadingDataSubject.asObservable();

  }
  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }
  getUrl(url) {
    return `${url}`;
  }
  getClientSecret(apiUrl, clientId, hostUrl) {
    // tslint:disable-next-line:max-line-length
    const params = '/api/oauth/authorize?' + 'client_id=' + clientId + '&redirect_uri=' + hostUrl + '/login&response_type=token&scope='
    return this.http.get<Client>(apiUrl + params);
  }

  login(url: string, email: string, password: string, clientId: string, clientSecret: string) {
    return this.http
      .post<Auth>(`${url}`, {
        username: email,
        password,
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'password',
        scope: '*'
      })
      .pipe(
        map(authData => {
          if (authData && authData.access_token) {
            this.storeResult(authData);
            this.currentUserSubject.next(authData);
          }
          return authData;
        })
      );
  }
  socialLogin(authData) {
    if (authData && authData.access_token) {
      this.storeResult(authData);
      this.currentUserSubject.next(authData);
    }
    return new BehaviorSubject<Auth>(authData).asObservable();
  }
  requestImplicitGrantToken(url) {
    return this.http.get(
      `${url}/api/oauth/authorize?client_id=4&redirect_uri=/callback&response_type=token&scope`
    );
  }
  register(user) {
    return this.http.post(`${user.apiUrl}/api/oauth/register`, user);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authData');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
    this.updateLoadingDataStatus(false);
  }

  storeResult(authData) {
    localStorage.setItem('authData', JSON.stringify(authData));
  }

  getToken() {
    return this.getUserData().access_token;
  }
  getUserId() {
    return this.getUserData().user.id;
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('authData'));
  }
  updateDefaultChama(chamaId) {
    const authData = this.getUserData();
    if (authData.user.chama_id !== chamaId) {

      authData.user.chama_id = chamaId;
      this.storeResult(authData);
      this.currentUserSubject.next(authData);
    }
  }
  public getCountryJSON(): Observable<any> {
    return this.http.get("/assets/country.json");

  }
  userHasRole(permission) {
    const authData = this.getUserData();
    return authData.user.roles.includes(permission);
  }
  activateAccount(account) {
    return this.http.post(`${account.apiUrl}/api/oauth/activate-account`, account);
  }
  reset(user) {
    return this.http.post(`${user.apiUrl}/api/oauth/password-reset/create`, user);
  }
  resetCodeFind(user) {
    return this.http.get<any>(`${user.apiUrl}/api/oauth/password-reset/find/${user.token}`);
  }
  resetPassword(user) {
    return this.http.post(`${user.apiUrl}/api/oauth/password-reset/reset`, user);
  }
  updateCurrentUserSubject(authData) {
      this.currentUserSubject.next(authData);
  }
  updateLoadingDataStatus(status) {
    this.loadingDataSubject.next(status);
  }
}
