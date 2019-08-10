import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'projects/chama/src/environments/environment';
import { startWith, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  createMessage(message) {
    return this.http.post(`${this.apiUrl}/api/message/create-message`, message);
  }
  getThreadMessages(messageId) {
   return this.http.get<any>(`${this.apiUrl}/api/message/${messageId}/get-thread-messages`)
  }
  onSendReplyMessage(message) {
    return this.http.post(`${this.apiUrl}/api/message/create-reply-message`, message);

  }
  searchChamaUserMessages(defaultMessageType: string, searchQueries?: any) {
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
  getChamaUserMessages(queryParams: string) {
    return this.http.get(
      `${this.apiUrl}/api/message/chama-user-message${queryParams}`
    );
  }
  getChamaUserMessageCount() {
    return this.http.get(
      `${this.apiUrl}/api/message/chama-user-message-count?messageType=inbox`
    );
  }
  changeMessageStatus(message) {
    return this.http.post(`${this.apiUrl}/api/message/change-message-status`, message);
  }
}
