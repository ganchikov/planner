import { Injectable } from '@angular/core';
import { TeamDataService } from '@app/team/team-data.service';

import {Absence, Person} from '@app/common/models';
import {CalendarItem} from '@app/team-calendar/models/calendar-item';

@Injectable()
export class TeamGanttDataService {

  constructor(private teamDS: TeamDataService) { }

  getGanttTeamData(callback: (gantt_items: CalendarItem[]) => void) {
    this.teamDS.getTeamData(items => {
      const resultItems: CalendarItem[] = [];
      items.forEach(item => {
        resultItems.push(...item.GetTypedItemAndFlatChildren<CalendarItem>(CalendarItem,
          {map: [{from_field: 'name', to_field: 'text'}]} ));
      });
      callback(resultItems);
    });
  }

  insertAbsence(newGanttItem: CalendarItem, parentGanttItem: CalendarItem,
                callback: (insertedGanttItem: CalendarItem, err: any) => void) {
    const newAbsenceItem: Absence = newGanttItem.GetTypedItem<Absence>(Absence, {map: [{from_field: 'text', to_field: 'name'}]});
    this.teamDS.insertAbsence(newAbsenceItem, (error, insertedAbsenceItem) => {
      if (error) {
        callback(null, error);
      } else {
        const personItem: Person = parentGanttItem.GetTypedItem<Person>(Person);
        personItem.absences.push(insertedAbsenceItem);
        const insertedGanttItem: CalendarItem = insertedAbsenceItem.GetTypedItem<CalendarItem>(CalendarItem,
                    {map: [{from_field: 'name', to_field: 'text'}]});
        callback(insertedGanttItem, null);
      }
    });
  }

  updateAbsence(absenceGanttItem: CalendarItem, callback: (error) => void) {
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

  updatePerson(personGanttItem: CalendarItem, callback: (error) => void) {
    const personItem: Person = personGanttItem.GetTypedItem<Person>(Person);
    this.teamDS.updatePerson(personItem, error => {
      callback(error);
    });
  }

}
