import { Injectable } from '@angular/core';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { map } from 'rxjs/operators';
import { ScheduleItem } from '@app/team-schedule/models/schedule-item';
import { Absence } from '@app/common/models';

@Injectable()
export class TeamScheduleService {

  constructor(private teamApi: TeamsApiService,
    private absenceApi: AbsencesApiService) { }

  getTeamSchedule() {
    return this.teamApi.getAllTeams().pipe(
      map(teams => teams.map(
          team => new ScheduleItem(team)
        )
      )
    );
  }

  insertAbsence(newItem: ScheduleItem) {
    return this.absenceApi.insertAbsence(newItem.GetTypedItem(Absence)).pipe(
      map(item => new ScheduleItem(item))
    );
  }

  updateAbsence(updatedItem: ScheduleItem) {
    return this.absenceApi.updateAbsence(updatedItem.GetTypedItem(Absence)).pipe(
      map(item => new ScheduleItem(item))
    );
  }

  deleteAbsence(item: ScheduleItem) {
    return this.absenceApi.deleteAbsence(item.GetTypedItem(Absence));
  }
}
