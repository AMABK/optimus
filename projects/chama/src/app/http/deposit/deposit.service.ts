import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deposit } from '../../models/deposit/deposit';
import { environment } from 'projects/chama/src/environments/environment';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: "root"
})
export class DepositService {
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
  search(searchQueries?: any, defaultTxnType = "") {
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
        txnType: defaultTxnType,
        debitType: "",
        paymentStatus: "",
        download:""
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
          verified,
          txnType = defaultTxnType,
          debitType,
          paymentStatus,
          download
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&pFromDate=${pFromDate}&pToDate=${pToDate}&sFromDate=${sFromDate}&sToDate=${sToDate}&verified=${verified}&txnType=${defaultTxnType}&debitType=${debitType}&paymentStatus=${paymentStatus}&download=${download}`;
          return this.getDefaultChamaDeposits(queryParams);
        }
      )
    );
  }
  getLoanRequests(searchQueries?: any) {
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
        debitType: "",
        paymentStatus: "",
        download:""
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
          verified,
          debitType,
          paymentStatus,
          download
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&pFromDate=${pFromDate}&pToDate=${pToDate}&sFromDate=${sFromDate}&sToDate=${sToDate}&verified=${verified}&debitType=${debitType}&paymentStatus=${paymentStatus}&download=${download}`;
          return this.getDefaultChamaLoanRequests(queryParams);
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
  getDefaultChamaLoanRequests(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-loan-request${queryParams}`
    );
  }
}
