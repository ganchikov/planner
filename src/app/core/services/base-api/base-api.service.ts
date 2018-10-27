import { BaseItem } from '@app/common/models';
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

  doGetRequest<T extends BaseItem> (route: string, mapper: (item: any) => T, methodName?: string): Observable<T[]> {
    return this.httpClient.get<any>(this.url + route).pipe(
      map(response => {
        return response.data.map(mapper);
        }),
      catchError(this.handleError(methodName ? methodName : route))
    );
  }

  doPostRequest<T extends BaseItem> (route: string, item: T, mapper: (item: any) => T, methodName?: string): Observable< {} | T> {
    return this.httpClient.post(this.url + route, item.GetObject()).pipe(
      map(response => mapper(response)),
      catchError(this.handleError(methodName ? methodName : route))
    );
  }

  doPatchRequest<T extends BaseItem> (route: string, item: T, mapper: (item: any) => T, methodName?: string): Observable< {} | T> {
    return this.httpClient.patch(this.url + route + `/${item._id}`, item.GetObject()).pipe(
      map(response => mapper(response)),
      catchError(this.handleError(methodName ? methodName : route))
    );
  }

  doDeleteRequest<T extends BaseItem> (route: string,
    itemId: Object,
    mapper?: (item: any) => any,
    methodName?: string): Observable< {} | T> {
      return this.httpClient.delete(this.url + route + `/${itemId.toString()}`).pipe(
        map(response => mapper ? mapper(response) : response),
        catchError(this.handleError(methodName ? methodName : route))
      );
  }
}
