import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'projects/chama/src/environments/environment';
import { Chama } from '../../models/chama/chama';
import { AuthService } from 'projects/auth/src/public_api';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChamaService {
  model = 'chama';
  token: string;

  constructor(private http: HttpClient, private authService: AuthService) {}

  createAuthorizationHeader(headers: Headers) {
    this.token = this.authService.getUserId();
    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('X-Requested-With', 'XMLHttpRequest');
  }
  getUrl() {
    return `${environment.apiUrl}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all(url) {
    //return this.http.get<Chama[]>(this.getUrl());
    this.token = this.authService.getUserData()['access_token'];
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    return this.http
      .get<Chama>(`${url}`, {
        headers: headers
      })
      .pipe(share());
  }

  load(id) {
    return this.http.get<Chama>(this.getUrlForId(id));
  }

  create(chama: Chama) {
    this.token = this.authService.getUserData()['access_token'];
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });
    return this.http.post(`http://localhost:8000/api/chama/create`, chama, {
      headers: headers
    });
  }

  update(chama: Chama) {
    return this.http.patch(this.getUrl(), chama);
  }
  updateDefaultChama(chamaId) {
    this.token = this.authService.getUserData()["access_token"];
    let headers = new HttpHeaders({
      Authorization: "Bearer " + this.token
    });
    
     this.http
      .post(`http://localhost:8000/api/chama/update-defaulta`,chamaId, {
        headers: headers
      });
    alert("jj");
  }

  delete(chama: Chama) {
    return this.http.delete(this.getUrlForId(chama.id));
  }
}
