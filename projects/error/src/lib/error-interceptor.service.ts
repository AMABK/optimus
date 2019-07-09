import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { NotificationService } from 'projects/notification/src/public_api';
import { AuthService } from 'projects/auth/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private notificationService: NotificationService, private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          let responseStatus = 'danger';
          let message = '';
          if (response.status === 401) {
            message = response.error.message;
            // auto logout if 401 response returned from api
            //this.authService.logout();
            //location.reload(true);
          }
          else if (response.status === 452) {
            // validation custom error
            let i = 0;
            for (var key in response.error.message) {
              if (i == 0) {
                message = response.error.message[key];
                i++;
              } else {
                message = message + '|' + response.error.message[key];
                i++;
              }
            }

          }
          else if (response.status === 0) {
            message = 'Considering the circumstances, the server might have taken leave without notice';
          }else {
            message = response.error.message;
          }


          this.notificationService.emit(
            message,
            responseStatus
          );
        }
        return throwError('response');
      })
    );
  }
}
