import { TeamDataService } from '@app/team/team-data.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {Absence, Person, Team} from '@app/common/models';
import { AppConfig } from '@app/app.config';

@Injectable()
export class TeamDataServiceMock extends TeamDataService {

  constructor() {
      super(null, null);
  }


  getTeamData(callback: (teams: Team[]) => void) {
  }

  insertAbsence(newItem: Absence, callback: (err?: any, insertedItem?: Absence) => void) {
  }

  updateAbsence(absenceItem: Absence, callback: (error?) => void) {
  }

  deleteAbsence(absenceId: Object, callback: (error?) => void) {
  }

  updatePerson(personItem: Person, callback: (error?) => void) {
  }


}
