import { Injectable } from '@angular/core';
import {BaseItem, Team, Person, Absence} from '../../../common/models';
import { TeamDataService } from './team-data.service';
import { DataItem } from '../../../common/DataItem';
import { unescapeIdentifier } from '@angular/compiler';
import { isDate } from 'util';

export class GanttItem extends BaseItem  {

  private _unscheduled: boolean;
  private _iscomplex: boolean;

  get text(): string {
    return this.name;
  }

  set text(val: string) {
    this.name = val;
  }

  get parent(): number {
    return this.parent_id;
  }

  set parent(parent_id: number) {
    this.parent_id = parent_id;
  }

  get type(): string {
    return 'task';
  }

  get open(): boolean {
    return true;
  }

  get start_date(): Date {
    let date: Date = new Date(this.GetValue('start_date'));
    if (date === undefined || isNaN(date.getDate())) {
        this._unscheduled = true;
        date = new Date(Date.now());
    }
    return date;
  }

  set start_date(val: Date) {
    this.SetValue<Date>('start_date', val);
  }

  get end_date(): Date {
    let date: Date = new Date(this.GetValue('end_date'));
    if (date === undefined || isNaN(date.getDate())) {
      this._unscheduled = true;
      date = new Date(Date.now());
    }
    return date;
  }

  set end_date(val: Date) {
    this.SetValue<Date>('end_date', val);
  }

  get confirmed(): boolean {
    return this.GetValue('confirmed');
  }

  set confirmed(val: boolean) {
    this.SetValue('confirmed', val);
  }

  get unscheduled(): boolean {
    return this._unscheduled;
  }

  set unscheduled(val: boolean) {
    this._unscheduled = val;
  }

  get is_complex(): boolean {

    if (this._iscomplex === undefined) {
      if (this.GetValue('absences') !== undefined &&
      (this.GetValue('absences') as Array<Object>).length > 0 ) {
        this._iscomplex = true;
      } else {
        this._iscomplex = false;
      }
    }
    return this._iscomplex;
  }

}

export class TeamGanttItem extends GanttItem {

}

export class PersonGanttItem extends GanttItem {

}

export class AbsenceGanttItem extends GanttItem {

}

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: GanttItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: GanttItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<GanttItem>(GanttItem));
      });
      callback(resultItems);
    });
  }

}
