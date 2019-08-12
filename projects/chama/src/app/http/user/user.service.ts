import { Injectable } from "@angular/core";
import { Deposit } from "../../models/deposit/deposit";
import { environment } from "projects/chama/src/environments/environment";
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getDefaultChamaDeposits(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-default-chama-deposits${queryParams}`
    );
  }
  updateDeposit(deposit: Deposit) {
    return this.http.post(`${this.apiUrl}/api/chama/update-deposit`, deposit);
  }
  searchUser(searchQueries?) {
    return searchQueries.pipe(
      startWith({
        q: "",
        page: 1,
        size: 10,
        cFromDate: "",
        cToDate: "",
        verified: "",
        gender: '',
        download:''
      }),
      debounceTime(500),
      distinctUntilChanged(),
      // tslint:disable-next-line:max-line-length
      switchMap(
        ({
          q = '',
          page = 1,
          size: resultPerPage = 10,
          cFromDate = '',
          cToDate = '',
          verified='',
          gender = '',
          download=''
          
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&cFromDate=${cFromDate}&cToDate=${cToDate}&verified=${verified}&gender=${gender}&download=${download}`;
          return this.getUsers(queryParams);
        }
      )
    );
  }
  searchChamaUser(searchQueries?) {
    return searchQueries.pipe(
      startWith({
        q: "",
        page: 1,
        size: 10,
        cFromDate: "",
        cToDate: "",
        verified: "",
        gender: '',
        download:''
      }),
      debounceTime(500),
      distinctUntilChanged(),
      // tslint:disable-next-line:max-line-length
      switchMap(
        ({
          q = '',
          page = 1,
          size: resultPerPage = 10,
          cFromDate = '',
          cToDate = '',
          verified='',
          gender = '',
          download=''
          
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&cFromDate=${cFromDate}&cToDate=${cToDate}&verified=${verified}&gender=${gender}&download=${download}`;
          return this.getChamaUser(queryParams);
        }
      )
    );
  }
  searchChamaUsers(userChamaStatus=0, searchQueries?) {
    return searchQueries.pipe(
      startWith({
        q: "",
        page: 1,
        size: 10,
        cFromDate: "",
        cToDate: "",
        status: "",
        userChamaStatus,
        gender: '',
        download:''
      }),
      debounceTime(500),
      distinctUntilChanged(),
      // tslint:disable-next-line:max-line-length
      switchMap(
        ({
          q = '',
          page = 1,
          size: resultPerPage = 10,
          cFromDate = '',
          cToDate = '',
          status = '',
          userChamaStatus,
          gender = '',
          download=''
          
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&cFromDate=${cFromDate}&cToDate=${cToDate}&status=${status}&gender=${gender}&download=${download}&userChamaStatus=${userChamaStatus}`;
          return this.getChamaUsers(queryParams);
        }
      )
    );
  }
  

  updateLoanRequestrrrr(loan) {
    return this.http.post(`${this.apiUrl}/api/chama/update-loan-request`, loan);
  }
  getUsers(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/admin/users${queryParams}`
    );
  }

  getChamaUser(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-chama-user${queryParams}`
    );
  }
  getChamaUsers(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-chama-users${queryParams}`
    );
  }

  getChamaUserPermissions(user) {
    return this.http.get<any>(
      `${this.apiUrl}/api/user/${user.user_id}/chama/${user.chama_id}/get-permissions`
    )
  }
  getChamaUserPermissionsList(user) {
    return this.http.get<any>(
      `${this.apiUrl}/api/user/${user.user_id}/chama/${user.chama_id}/get-permissions-list`
    )
  }
  updateChamaUserPermissions(role) {
    return this.http.post(`${this.apiUrl}/api/user/update-permissions`, role);
  }
  changeChamaUserStatus(userChama) {
    return this.http.post(`${this.apiUrl}/api/user/change-chama-user-status`, userChama);
  }
  acceptGroupInviteRequest(request) {
    return this.http.post<any>(`${this.apiUrl}/api/user/accept-group-invite-request`, request);
  }
  updateUserProfile(user) {
    return this.http.post<User[]>(`${this.apiUrl}/api/user/update-user-profile`, user);
  }
  changePassword(user) {
    return this.http.post<User[]>(`${this.apiUrl}/api/user/change-password`, user);
  }
  getUser(userId) {
    return this.http.get(`${this.apiUrl}/api/user/${userId}/get-user`);
  }

}
