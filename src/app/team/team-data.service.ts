import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {Absence, Person, Team} from '@app/common/models';
import { AppConfig } from '@app/app.config';
import {Logger} from '@app/core/services';

@Injectable()
export class TeamDataService {

  constructor(private http: HttpClient, private logger: Logger) { }

  private url = AppConfig.settings.enableHttps ? AppConfig.settings.apiServer.httpsUrl : AppConfig.settings.apiServer.url;

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
    this.http.get<any>(this.url + 'teams-calendar').subscribe(responseObjects => {
        const results: Team[] = [];
        for (const respObj of responseObjects.data) {
          const team = new Team(respObj);
          results.push(team);
        }
        callback(results);
    });
  }

  insertAbsence(newItem: Absence, callback: (err?: any, insertedItem?: Absence) => void) {
    this.http.post<Absence>(this.url + 'absences', newItem.GetObject()).subscribe(insertedItem => {
        const insertedAbsenceItem: Absence = new Absence(insertedItem);
        callback(null, insertedAbsenceItem);
    }, error => {
      callback(error);
    });
  }

  updateAbsence(absenceItem: Absence, callback: (error?) => void) {
    this.http.patch<Absence>(this.url + 'absences', absenceItem.GetObject()).subscribe(() => {
      callback();
    }, error => {
      callback(error);
    });
  }

  deleteAbsence(absenceId: Object, callback: (error?) => void) {
    this.http.delete(this.url + `absences/${absenceId.toString()}`).subscribe(() => {
      callback();
    }, error => {
      callback(error);
    });
  }

  updatePerson(personItem: Person, callback: (error?) => void) {
    this.http.patch<Person>(this.url + 'people', personItem._id, personItem.GetObject()).subscribe(() => {
          callback();
    }, error => {
      callback(error);
    });
  }


}
