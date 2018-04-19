import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

import {LoggerService} from '../services/logger.service';
import {Team, Person, Absence} from '../../../common/models';
import { AppConfig } from '../app.config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TeamDataService {

  constructor(private http: HttpClient, private logger: LoggerService) { }

  private url = AppConfig.settings.apiServer.url;

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
    this.http.get<any>(this.url + 'teams').pipe(
      tap ( teams => {
        this.log('fetched teams' + teams);
      }),
      catchError(this.handleError('getTeamData', []))
    ).subscribe(responseObjects => {
        const results: Team[] = [];
        for (const respObj of responseObjects.data) {
          const team = new Team(respObj);
          results.push(team);
        }
        callback(results);
    });
  }

  insertAbsence(newItem: Absence, callback: (err?: any, insertedItem?: Absence) => void) {
    this.http.post<Absence>(this.url + 'absences', newItem.GetObject(), httpOptions).pipe(
      tap ( insertedItem => {
        this.log('inserted absence' + insertedItem);
      }),
      catchError(this.handleError('insertAbsence'))
    ).subscribe(insertedItem => {
        const insertedAbsenceItem: Absence = new Absence(insertedItem);
        callback(null, insertedAbsenceItem);
    }, error => {
      callback(error);
    });
  }

  updateAbsence(absenceItem: Absence, callback: (error?) => void) {
    this.http.put<Absence>(this.url + 'absences', absenceItem.GetObject(), httpOptions).pipe(
      tap(absence => {
        this.log('absence updated ' + absence);
      }),
      catchError(this.handleError('updateAbsence', []))
    ).subscribe(() => {
      callback();
    }, error => {
      callback(error);
    });
  }

  deleteAbsence(absenceId: Object, callback: (error?) => void) {
    this.http.delete(this.url + `absences/${absenceId.toString()}`, httpOptions).pipe(
      tap(absence => {
        this.log('absence deleted _id:' + absenceId);
      }),
      catchError(this.handleError('deleteAbsence', []))
    ).subscribe(() => {
      callback();
    }, error => {
      callback(error);
    });
  }

  updatePerson(personItem: Person, callback: (error?) => void) {
    this.http.put<Person>(this.url + 'people', personItem.GetObject(), httpOptions).pipe(
      tap ( person => {
        this.log('person updated' + person);
      }),
      catchError(this.handleError('updatePerson', []))
    ).subscribe(() => {
          callback();
    }, error => {
      callback(error);
    });
  }


}
