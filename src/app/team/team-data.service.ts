import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import {LoggerService} from '../services/logger.service';
import {Team, Person, Absence} from '../../../common/models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TeamDataService {

  constructor(private http: HttpClient, private logger: LoggerService) { }

  private url = 'http://localhost:8001/api';

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
    this.http.get<Team[]>(this.url + '/teams').pipe(
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

  insertAbsence(newItem: Absence, callback: (insertedItem?: Absence, err?: any) => void) {
    this.http.put<Absence>(this.url + '/absence', newItem.GetObject(), httpOptions).pipe(
      tap ( insertedItem => {
        this.log('inserted absence' + insertedItem);
      }),
      catchError(this.handleError('insertAbsence', []))
    ).subscribe(insertedItem => {
        const insertedAbsenceItem: Absence = new Absence(insertedItem);
        callback(insertedAbsenceItem);
    }, error => {
      callback(... error);
    });
  }

  updatePerson(personItem: Person, callback: (personItem?: Person, err?: any) => void) {
    this.http.post<Person>(this.url + '/person', personItem, httpOptions).pipe(
      tap ( person => {
        this.log('updated' + person);
      }),
      catchError(this.handleError('updatePerson', []))
    ).subscribe(
        item => {
          callback(item as Person);
    }, error => {
      callback(... error);
    });
  }


}
