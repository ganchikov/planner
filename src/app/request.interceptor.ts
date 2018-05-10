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
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {LoggerService} from './services/logger.service';
import { Logger } from 'mongodb';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService, private router: Router) {


  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        ContentType:  'application/json',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      }
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.logger.log(`${event.url} ${event.status}`);
      }
    },
     (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        } else {
          this.logger.log(err);
        }
     });
  }
}
