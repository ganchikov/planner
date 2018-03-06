import { Injectable } from '@angular/core';
import { TeamDataService } from './team-data.service';
import { GanttItem } from '../common/ganttitem';



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
