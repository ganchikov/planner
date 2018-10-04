import { Injectable } from '@angular/core';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { map } from 'rxjs/operators';
import { CalendarItem } from './models/calendar-item';
import { Absence } from '@app/common/models';
import { BaseApiService } from '@app/core/services';

@Injectable()
export class TeamCalendarService {

  constructor(private baseApi: BaseApiService,
    private absenceApi: AbsencesApiService) { }

  getTeamCalendar() {
    return this.baseApi.doGetRequest('teams-calendar?flat=true', item => {
      return new CalendarItem(item);
    }, 'getTeamCalendar');
    // return this.teamApi.getAllTeams().pipe(
    //   map(teams => {
    //     const resultSet = [];
    //     teams.forEach(
    //       team => resultSet.push(...team.GetTypedItemAndFlatChildren<CalendarItem>(CalendarItem,
    //         {map: [{from_field: 'name', to_field: 'text'}]} ))
    //     );
    //     return resultSet;
    //   }));
  }

  insertAbsence(newItem: CalendarItem) {
    return this.absenceApi.insertAbsence(newItem.GetTypedItem(Absence, {map: [{from_field: 'text', to_field: 'name'}]} )).pipe(
      map(item => {
        return new CalendarItem(item);
      })
    );
  }

  updateAbsence(updatedItem: CalendarItem) {
    return this.absenceApi.updateAbsence(updatedItem.GetTypedItem(Absence)).pipe(
      map(item => new CalendarItem(item))
    );
  }

  deleteAbsence(item: CalendarItem) {
    return this.absenceApi.deleteAbsence(item.GetTypedItem(Absence));
  }
}
