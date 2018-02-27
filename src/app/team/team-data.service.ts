import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import {LoggerService} from '../services/logger.service';
import {Team} from '../../../common/models';

@Injectable()
export class TeamDataService {

  constructor(private http: HttpClient, private logger: LoggerService) { }

  private url = 'http://localhost:8001/api/teams';

  private log (message: string) {
    this.logger.log('TeamDataService: ' + message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getTeamData(callback: (teams: Team[]) => void) {
    this.http.get<Team[]>(this.url).pipe(
      tap ( teams => {
        this.log('fetched teams' + teams);
      }),
      catchError(this.handleError('getTeamData', []))
    ).subscribe(responseObjects => {
        const results: Team[] = [];
        for (const respObj of responseObjects) {
          const team = new Team(respObj);
          results.push(team);
        }
        callback(results);
    });
  }

}
