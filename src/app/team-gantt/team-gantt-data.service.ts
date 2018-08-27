import { Injectable } from '@angular/core';
import { TeamDataService } from '../team/team-data.service';

import {Absence} from '../common/models/absence';
import {Person} from '../common/models/person';
import {GanttItem} from '../common/models/gantt-item';
import {TeamGanttItem} from '../common/models/team-gantt-item';

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: TeamGanttItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: TeamGanttItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<TeamGanttItem>(TeamGanttItem,
          {map: [{from_field: 'name', to_field: 'text'}]} ));
      });
      callback(resultItems);
    });
  }

  insertAbsence(newGanttItem: TeamGanttItem, parentGanttItem: TeamGanttItem,
                callback: (insertedGanttItem: TeamGanttItem, err: any) => void) {
    const newAbsenceItem: Absence = newGanttItem.GetTypedItem<Absence>(Absence, {map: [{from_field: 'text', to_field: 'name'}]});
    this.teamDS.insertAbsence(newAbsenceItem, (error, insertedAbsenceItem) => {
      if (error) {
        callback(null, error);
      } else {
        const personItem: Person = parentGanttItem.GetTypedItem<Person>(Person);
        personItem.absences.push(insertedAbsenceItem);
        const insertedGanttItem: TeamGanttItem = insertedAbsenceItem.GetTypedItem<TeamGanttItem>(TeamGanttItem,
                    {map: [{from_field: 'name', to_field: 'text'}]});
        callback(insertedGanttItem, null);
      }
    });
  }

  updateAbsence(absenceGanttItem: TeamGanttItem, callback: (error) => void) {
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

  updatePerson(personGanttItem: TeamGanttItem, callback: (error) => void) {
    const personItem: Person = personGanttItem.GetTypedItem<Person>(Person);
    this.teamDS.updatePerson(personItem, error => {
      callback(error);
    });
  }

}
