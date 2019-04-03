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
import { AuthService } from 'projects/auth/src/public_api';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private notificationService: NotificationService, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            this.authService.logout();
            location.reload(true);
          }
          let responseStatus = 'danger';
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
