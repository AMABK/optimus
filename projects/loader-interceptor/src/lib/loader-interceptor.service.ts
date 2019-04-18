import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { LoaderService } from 'projects/loader/src/public_api';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NotificationService } from 'projects/notification/src/public_api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService implements HttpInterceptor {

  private totalRequests = 0;

  constructor(private loaderService: LoaderService, private notificationService: NotificationService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    this.loaderService.setLoading(true);
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse) {
          this.decreaseRequests();
        }
      }),
      catchError(err => {
        this.decreaseRequests();
        throw err;
      })
    );
  }

  private decreaseRequests() {
    this.totalRequests--;
    if ((this.totalRequests == 0)||(this.router.url === 'login')) {
      this.loaderService.setLoading(false);
      if (sessionStorage.getItem('alert') !== null) {
        const item = JSON.parse(sessionStorage.getItem('alert'));
        this.notificationService.emit(item.message, item.status);
        sessionStorage.removeItem('alert');
      }
    }
  }
  public storeNotificationMessage(message: string, status: string) {
    const item = {
      message,
      status
    };
    // set message to be emitted by loader interceptor after http request end
    sessionStorage.setItem('alert', JSON.stringify(item));
  }
}
