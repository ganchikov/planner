import { CalendarItem } from '@app/common/models';
import { BaseApiService } from '@app/core/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsCalendarApiService {

  constructor(public api: BaseApiService) { }

  getTeamCalendar() {
    return this.api.doGetRequest('teams-calendar?flat=true', item => {
      return new CalendarItem(item);
    }, 'getTeamCalendar');
  }
}
