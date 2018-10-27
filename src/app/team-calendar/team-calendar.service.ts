import * as moment from 'moment';

import { Injectable } from '@angular/core';
import { TeamsApiService, AbsencesApiService } from '@app/backend-api';
import { map } from 'rxjs/operators';
import { CalendarItem, DateItem } from '@app/common/models';
import { Absence } from '@app/common/models';
import { BaseApiService } from '@app/core/services';

import {Duration} from './models/duration';

@Injectable()
export class TeamCalendarService {

  constructor(private baseApi: BaseApiService,
    private absenceApi: AbsencesApiService) { }


  insertAbsence(newItem: CalendarItem) {
    return this.absenceApi.insertAbsence(newItem.GetTypedItem(Absence, {map: [{from_field: 'text', to_field: 'name'}]} )).pipe(
      map(item => {
        return new CalendarItem(item);
      })
    );
  }

  updateAbsence(updatedItem: CalendarItem) {
    return this.absenceApi.updateAbsence(updatedItem.GetTypedItem(Absence, {map: [{from_field: 'text', to_field: 'name'}]} )).pipe(
      map(item => new CalendarItem(item))
    );
  }

  deleteAbsence(item: CalendarItem) {
    return this.absenceApi.deleteAbsence(item.GetTypedItem(Absence, {map: [{from_field: 'text', to_field: 'name'}]} ));
  }

  public recalculateStartEndDates(item: CalendarItem) {
    let min_date: Date = item.schedule_dates[0].start_date;
    let max_date: Date = item.schedule_dates[0].end_date;
    for (const date of item.schedule_dates) {
      if (moment(date.start_date).isBefore(min_date)) {min_date = date.start_date; }
      if (moment(date.end_date).isAfter(max_date)) {max_date = date.end_date; }
    }
    item.start_date = min_date;
    item.end_date = max_date;
  }

  public sortScheduleDates(item: CalendarItem) {
    item.schedule_dates.sort((a, b) => {
      if (moment(a.start_date).isAfter(b.start_date)) {return 1; } else
      if (moment(a.start_date).isBefore(b.start_date)) {return -1; }
      return 0;
    });
  }

  public getAbsoluteDurations(item: CalendarItem): Duration[] {

    this.recalculateStartEndDates(item);
    const durations: Duration[] = [];
    for (const dateItem of item.schedule_dates) {
      const offset: number = moment(dateItem.start_date).diff(moment(item.start_date), 'days');
      const duration: number = moment(dateItem.end_date).diff(moment(dateItem.start_date), 'days');
      durations.push(new Duration(offset, duration));
    }
    return durations;
  }

  public getTotalDuration(item: CalendarItem): number {
    return moment(item.end_date).diff(moment(item.start_date), 'days');
  }

  public addScheduleDates(item: CalendarItem, schedule_date: DateItem) {
    item.schedule_dates.push(schedule_date);
  }

  public updateScheduleDateId(item: CalendarItem, oldId: number, newId: number) {
    const dateItem = item.schedule_dates.find(el => el.id === oldId);
    dateItem.id = newId;
  }

  public replaceScheduleDate(item: CalendarItem, id: number, new_schedule_date: DateItem) {
    item.schedule_dates.splice(item.schedule_dates.findIndex(el => el.id === id), 1);
    item.schedule_dates.push(new_schedule_date);
  }
}
