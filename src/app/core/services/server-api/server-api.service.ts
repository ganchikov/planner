import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {Absence, Person, Team} from '@app/common/models';
import { AppConfig } from '@app/app.config';
import {Logger} from '@app/core/services';

@Injectable({
  providedIn: 'root'
})

export class ServerApiService {


  private url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;

  constructor(private httpClient: HttpClient, private logger: Logger) { }

  private log (message: string) {
    this.logger.log('ServerApi: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  async getTeams(): Promise<Team[]> {
    try {
      const response = await this.httpClient.get<any>(this.url + 'teams').toPromise();
      const result: Team[] = [];
      for (const responseItem of response.data) {
        const team = new Team(responseItem);
        result.push(team);
      }
      return result;
    } catch (err) {
      this.handleError('get teams');
    }
  }
}
