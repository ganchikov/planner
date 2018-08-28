import { Injectable } from '@angular/core';
import { TeamDataService } from '@app/team/team-data.service';

import {Absence, Person} from '@app/common/models';
import {TeamScheduleItem} from '@app/team-schedule/models/team-schedule-item';

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: TeamScheduleItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: TeamScheduleItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<TeamScheduleItem>(TeamScheduleItem,
          {map: [{from_field: 'name', to_field: 'text'}]} ));
      });
      callback(resultItems);
    });
  }

  insertAbsence(newGanttItem: TeamScheduleItem, parentGanttItem: TeamScheduleItem,
                callback: (insertedGanttItem: TeamScheduleItem, err: any) => void) {
    const newAbsenceItem: Absence = newGanttItem.GetTypedItem<Absence>(Absence, {map: [{from_field: 'text', to_field: 'name'}]});
    this.teamDS.insertAbsence(newAbsenceItem, (error, insertedAbsenceItem) => {
      if (error) {
        callback(null, error);
      } else {
        const personItem: Person = parentGanttItem.GetTypedItem<Person>(Person);
        personItem.absences.push(insertedAbsenceItem);
        const insertedGanttItem: TeamScheduleItem = insertedAbsenceItem.GetTypedItem<TeamScheduleItem>(TeamScheduleItem,
                    {map: [{from_field: 'name', to_field: 'text'}]});
        callback(insertedGanttItem, null);
      }
    });
  }

  updateAbsence(absenceGanttItem: TeamScheduleItem, callback: (error) => void) {
    const absenceItem: Absence = absenceGanttItem.GetTypedItem<Absence>(Absence, {map: [{from_field: 'text', to_field: 'name'}]});
    this.teamDS.updateAbsence(absenceItem, error => {
      callback(error);
    });
  }

  deleteAbsence(absenceId: Object, callback: (error) => void) {
    this.teamDS.deleteAbsence(absenceId, error => {
      callback(error);
    });
  }

  updatePerson(personGanttItem: TeamScheduleItem, callback: (error) => void) {
    const personItem: Person = personGanttItem.GetTypedItem<Person>(Person);
    this.teamDS.updatePerson(personItem, error => {
      callback(error);
    });
  }

}
