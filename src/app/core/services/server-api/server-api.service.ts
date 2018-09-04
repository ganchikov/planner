import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {map, catchError, tap} from 'rxjs/operators';

import {Absence, Person, Team} from '@app/common/models';
import { AppConfig } from '@app/app.config';
import {Logger} from '@app/core/services/logger/logger.service';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class ServerApiService {


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

  getTeams(): Observable<Team[]> {
      return this.httpClient.get<any>(this.url + 'teams').pipe(
        map(response => response.data.map(itm => new Team(itm)))
        , catchError(this.handleError('getTeams')));
  }
}
