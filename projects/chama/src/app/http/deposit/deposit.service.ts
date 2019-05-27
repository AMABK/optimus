import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Deposit } from '../../models/deposit/deposit';
import { environment } from 'projects/chama/src/environments/environment';
import { Observable } from 'rxjs';
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
  getDefaultChamaDeposits(queryParams:string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-default-chama-deposits${queryParams}`
    );
  }
  updateDeposit(deposit: Deposit) {
    return this.http.post(
      `${this.apiUrl}/api/chama/update-deposit`,
      deposit
    );
  }
  search(searchQueries?: any) {
    return searchQueries.pipe(
      startWith({ q: '', page: 1, size: 20, pFromDate: '', pToDate: '', sFromDate: '', sToDate: '', verified: ''}),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(({ q = '', page = 1, size: resultPerPage = 20, pFromDate = '', pToDate = '', sFromDate = '', sToDate = '',verified }) => {
        const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&pFromDate=${pFromDate}&pToDate=${pToDate}&sFromDate=${sFromDate}&sToDate=${sToDate}&verified=${verified}`;
        return this.getDefaultChamaDeposits(queryParams);
      }),
    );
  }
}
