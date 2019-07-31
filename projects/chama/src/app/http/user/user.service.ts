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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  createMessage(message) {
    return this.http.post(`${this.apiUrl}/api/message/create-message`, message);
  }
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
          return this.getChamaUsers(queryParams);
        }
      )
    );
  }
  
  searchChamaUserMessages(searchQueries?: any, defaultMessageType = "") {
    return searchQueries.pipe(
      startWith({
        q: "",
        page: 1,
        size: 10,
        pFromDate: "",
        pToDate: "",
        sFromDate: "",
        sToDate: "",
        verified: "",
        messageType: defaultMessageType
      }),
      debounceTime(500),
      distinctUntilChanged(),
      // tslint:disable-next-line:max-line-length
      switchMap(
        ({
          q = "",
          page = 1,
          size: resultPerPage = 10,
          pFromDate = "",
          pToDate = "",
          sFromDate = "",
          sToDate = "",
          messageType = defaultMessageType
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&pFromDate=${pFromDate}&pToDate=${pToDate}&sFromDate=${sFromDate}&sToDate=${sToDate}&messageType=${messageType}`;
          return this.getChamaUserMessages(queryParams);
        }
      )
    );
  }
  createLoanRequest(loan) {
    return this.http.post(`${this.apiUrl}/api/chama/create-loan-request`, loan);
  }
  updateLoanRequest(loan) {
    return this.http.post(`${this.apiUrl}/api/chama/update-loan-request`, loan);
  }
  getUsers(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/admin/users${queryParams}`
    );
  }
  getChamaUserMessages(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/message/chama-user-message${queryParams}`
    );
  }
  getChamaUsers(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-chama-users${queryParams}`
    );
  }
}
