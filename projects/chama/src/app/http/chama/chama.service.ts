import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'projects/chama/src/environments/environment';
import { Chama } from '../../models/chama/chama';
import { AuthService } from 'projects/auth/src/public_api';
import { share } from 'rxjs/operators';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: "root"
})
export class ChamaService {
  model = "chama";
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createAuthorizationHeader(headers: Headers) {
    this.token = this.authService.getUserId();
    headers.append("Authorization", "Bearer " + this.token);
    headers.append("X-Requested-With", "XMLHttpRequest");
  }
  getUrl() {
    return `${environment.apiUrl}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all(url) {
    //return this.http.get<Chama[]>(this.getUrl());
    this.token = this.authService.getUserData()["access_token"];
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });
    return this.http
      .get<Chama>(`${url}`, {
        headers: headers
      })
      .pipe(share());
  }

  getChama(id) {
    return this.http.get<Chama>(
      `${environment.apiUrl}/api/${this.model}/${id}`
    );
  }

  getDefaultChamaDetails() {
    return this.http.get<User>(
      `${environment.apiUrl}/api/${this.model}/default-chama/`
    );
  }

  create(chama: Chama) {
    this.token = this.authService.getUserData()["access_token"];
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });
    return this.http.post(`${environment.apiUrl}/api/${this.model}/create`, chama, {
      headers: headers
    });
  }

  createPaymentMode(paymentMode) {
    return this.http.post(
      `${environment.apiUrl}/api/${this.model}/create-payment-mode`,
      paymentMode
    );
  }
  createInvite(createInvite) {
    return this.http.post(
      `${environment.apiUrl}/api/user/invite`,
      createInvite
    );
  }
  createContributionType(createContributionType) {
    return this.http.post(
      `${environment.apiUrl}/api/chama/create-contribution-type`,
      createContributionType
    );
  }
  update(chama: Chama) {
    return this.http
      .post<Chama>(`${environment.apiUrl}/api/chama/update`, chama)
      .pipe(share());
  }
  updatePaymentMode(paymentMode) {
    return this.http.post(
      `${environment.apiUrl}/api/chama/update-payment-mode`,
      paymentMode
    );
  }
  updateDefaultChama(chamaId) {
    this.token = this.authService.getUserData()["access_token"];
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });

    return this.http.post(
      `${environment.apiUrl}/api/chama/update-default`,
      {
        chamaId: chamaId
      },
      {
        headers: headers
      }
    );
  }

  delete(chama: Chama) {
    return this.http.delete(this.getUrlForId(chama.id));
  }
}
