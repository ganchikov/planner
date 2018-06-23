import { TeamDataService } from './team-data.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {Absence} from '../common/models/absence';
import {Person} from '../common/models/person';
import {Team} from '../common/models/team';

import { AppConfig } from '../app.config';
import {Logger} from '../common/services/logger.service';

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
