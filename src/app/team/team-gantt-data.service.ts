import { Injectable } from '@angular/core';
import {BaseItem, Team, Person, Absence} from '../../../common/models';
import { TeamDataService } from './team-data.service';
import { DataItem } from '../../../common/DataItem';

export class GanttItem extends BaseItem  {

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
    return this.GetValue('start_date');
  }

  set start_date(val: Date) {
    this.SetValue<Date>('start_date', val);
  }

  get end_date(): Date {
    return this.GetValue('end_date');
  }

  set end_date(val: Date) {
    this.SetValue<Date>('end_date', val);
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
