import { Injectable } from '@angular/core';
import {Team, Person, Absence} from '../../../common/models';
import { TeamDataService } from './team-data.service';

export class TeamGanttItem extends Team {

}

export class PersonGanttItem extends Person {

}

export class AbsenceGanttItem extends Absence {

}

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData() {

  }

}
