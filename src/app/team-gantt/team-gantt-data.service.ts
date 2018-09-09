import { Injectable } from '@angular/core';
import { TeamDataService } from '@app/team/team-data.service';

import {Absence, Person} from '@app/common/models';
import {ScheduleItem} from '@app/team-schedule/models/schedule-item';

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: ScheduleItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: ScheduleItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<ScheduleItem>(ScheduleItem,
          {map: [{from_field: 'name', to_field: 'text'}]} ));
      });
      callback(resultItems);
    });
  }

  insertAbsence(newGanttItem: ScheduleItem, parentGanttItem: ScheduleItem,
                callback: (insertedGanttItem: ScheduleItem, err: any) => void) {
    const newAbsenceItem: Absence = newGanttItem.GetTypedItem<Absence>(Absence, {map: [{from_field: 'text', to_field: 'name'}]});
    this.teamDS.insertAbsence(newAbsenceItem, (error, insertedAbsenceItem) => {
      if (error) {
        callback(null, error);
      } else {
        const personItem: Person = parentGanttItem.GetTypedItem<Person>(Person);
        personItem.absences.push(insertedAbsenceItem);
        const insertedGanttItem: ScheduleItem = insertedAbsenceItem.GetTypedItem<ScheduleItem>(ScheduleItem,
                    {map: [{from_field: 'name', to_field: 'text'}]});
        callback(insertedGanttItem, null);
      }
    });
  }

  updateAbsence(absenceGanttItem: ScheduleItem, callback: (error) => void) {
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

  updatePerson(personGanttItem: ScheduleItem, callback: (error) => void) {
    const personItem: Person = personGanttItem.GetTypedItem<Person>(Person);
    this.teamDS.updatePerson(personItem, error => {
      callback(error);
    });
  }

}
