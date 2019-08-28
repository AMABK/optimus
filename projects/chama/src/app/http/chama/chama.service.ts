import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'projects/chama/src/environments/environment';
import { Chama } from '../../models/chama/chama';
import { AuthService } from 'projects/auth/src/public_api';
import { share } from 'rxjs/operators';
import { User } from '../../models/user/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChamaService {
  model = 'chama';
  token: string;
  groupsData = {
    chamas: [],
    default: []
  };
  protected groupsDataSubject: BehaviorSubject<any>;
  protected groups: Observable<any>;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.groupsDataSubject = new BehaviorSubject<any>(this.groupsData);
    this.groups = this.groupsDataSubject.asObservable();
  }
  getUrl() {
    return `${environment.apiUrl}${this.model}`;
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  all(url) {
    return this.http
      .get<Chama>(`${url}`)
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
    return this.http.post(`${environment.apiUrl}/api/${this.model}/create`, chama);
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
    return this.http.post(
      `${environment.apiUrl}/api/chama/update-default`,
      {
        chamaId
      }
    );
  }

  delete(chama: Chama) {
    return this.http.delete(this.getUrlForId(chama.id));
  }
  joinGroupByInviteCode(invite) {
    return this.http.post(
      `${environment.apiUrl}/api/chama/join-group-invite-by-code`, invite);
  }
  generateGroupInviteCode(chama) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/chama/generate-group-invite-code`, chama);
  }
  getGroupInviteCode(chamaId) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/chama/${chamaId}/get-group-invite-code`);
  }
  getChamaMemberInvites(chamaId) {
    return this.http.get<any>(
      `${environment.apiUrl}/api/chama/${chamaId}/get-chama-member-invites`);
  }
  setUserGroupList(groupsObject = []) {
    if (groupsObject.length > 0) {
      this.groupsData.chamas = groupsObject;
    }
    const authData = this.authService.getUserData();
    authData.user.chamas = this.groupsData;
    this.authService.storeResult(authData);
    this.groupsDataSubject.next(this.groupsData);
  }
}
