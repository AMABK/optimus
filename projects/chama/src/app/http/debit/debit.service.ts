import { Injectable } from '@angular/core';
import { environment } from 'projects/chama/src/environments/environment';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DebitService {

 apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  searchDebitRequests(searchQueries?: any) {
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
        download: "",
        requestType: '',
        asAdmin:""
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
          download,
          requestType,
          asAdmin=""
        }) => {
          // tslint:disable-next-line:max-line-length
          const queryParams = `?page=${page}&size=${resultPerPage}&q=${q}&pFromDate=${pFromDate}&pToDate=${pToDate}&sFromDate=${sFromDate}&sToDate=${sToDate}&verified=${verified}&download=${download}&requestType=${requestType}&asAdmin=${asAdmin}`;
          return this.getDefaultChamaDebitRequests(queryParams);
        }
      )
    );
  }
  createDebitRequest(debitData) {
    return this.http.post(`${this.apiUrl}/api/chama/create-debit-request`, debitData);
  }
  updateDebitRequest(loan) {
    return this.http.post(`${this.apiUrl}/api/chama/update-debit-request`, loan);
  }
  updateDebitRequestStatus(debitData) {
    return this.http.post(`${this.apiUrl}/api/chama/update-debit-request-status`, debitData);
  }
  deleteDebitRequest(debitData) {
    return this.http.post(`${this.apiUrl}/api/chama/delete-debit-request`, debitData);
  }
  getDefaultChamaDebitRequests(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/chama/get-debit-request${queryParams}`
    );
  }
}
