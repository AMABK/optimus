import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Deposit } from "../../models/deposit/deposit";
import { environment } from "projects/chama/src/environments/environment";
import {
  startWith,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  createDeposit(deposit) {
    return this.http.post(`${this.apiUrl}/api/chama/create-deposit`, deposit);
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
}
