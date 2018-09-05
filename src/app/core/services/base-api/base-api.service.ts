import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {map, catchError, tap} from 'rxjs/operators';

import { AppConfig } from '@app/app.config';
import {Logger} from '@app/core/services/logger/logger.service';

@Injectable()

export class BaseApiService {

  url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;

  constructor(private httpClient: HttpClient, private logger: Logger) { }

  private log (error: Object) {
    this.logger.log('ServerApi: ' + error);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    const logger = this.logger;
    return (error: any): Observable<T> => {
      logger.log(`${operation} failed: ${error.message}`);
      if (result) {
        return of(result as T);
      } else {
        return throwError(error);
      }
    };
  }

  doGetRequest<T> (route: string, mapper: (item: any) => T, methodName?: string): Observable<T[]> {
    return this.httpClient.get<any>(this.url + route).pipe(
      map(response => response.data.map(mapper)),
      catchError(this.handleError(methodName ? methodName : route))
    );
  }

  doPostRequest<T> (route: string, item: T, mapper: (item: any) => T, methodName?: string): Observable< {} | T> {
    return this.httpClient.post(this.url + route, item).pipe(
      map(response => mapper(response)),
      catchError(this.handleError(methodName ? methodName : route))
    );
  }

}
