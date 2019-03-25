import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NotificationService } from 'projects/notification/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(response => {
        console.log(response);
        if (response instanceof HttpErrorResponse) {
          let responseStatus = 'danger';
          console.log(response.status);
          if (response.status == 200) {
            responseStatus = 'success';
          }
          this.notificationService.emit(
            `${response.error.message}`,
            responseStatus
          );
        }
        return throwError('response');
      })
    );
  }
}
