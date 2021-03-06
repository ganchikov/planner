
import {tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {Logger} from '@app/core/services';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private logger: Logger, private router: Router) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = localStorage.getItem('access_token');
    request = request.clone({
      setHeaders: {
        ContentType:  'application/json',
        Authorization: access_token ? `Bearer ${access_token}` : '',
      }
    });
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.logger.log(`${event.url} ${event.status}`);
      }
    },
     (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/401']);
          }
        } else {
          this.logger.log(err);
        }
     }));
  }
}
