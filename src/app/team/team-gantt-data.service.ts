import { Injectable } from '@angular/core';
import { TeamDataService } from './team-data.service';
import { TeamGanttItem } from '../common/ganttitem';



@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: TeamGanttItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: TeamGanttItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<TeamGanttItem>(TeamGanttItem));
      });
      callback(resultItems);
    });
  }

}
