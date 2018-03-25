import { Injectable } from '@angular/core';
import { TeamDataService } from './team-data.service';
import { TeamGanttItem } from '../common/ganttitem';
import {Absence, Person} from '../../../common/models';



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

  insertAbsence(newAbsenceGanttItem: TeamGanttItem, parentGanttItem: TeamGanttItem,
                callback: (insertedGanttItem: TeamGanttItem, err: any) => void) {
    const newAbsenceItem: Absence = newAbsenceGanttItem.GetTypedItem<Absence>(Absence);
    this.teamDS.insertAbsence(newAbsenceItem, (error, insertedAbsenceItem) => {
      if (error) {
        callback(null, error);
      } else {
        newAbsenceGanttItem._id = insertedAbsenceItem._id;
        newAbsenceGanttItem.id = insertedAbsenceItem.id;
        const personItem: Person = parentGanttItem.GetTypedItem<Person>(Person);
        personItem.absences.push(insertedAbsenceItem);
        this.teamDS.updatePerson(personItem, (err) => {
          callback(newAbsenceGanttItem, err);
        });
      }
    });
  }

  updateAbsence(absenceGanttItem: TeamGanttItem, callback: (error) => void) {
    const absenceItem: Absence = absenceGanttItem.GetTypedItem<Absence>(Absence);
    this.teamDS.updateAbsence(absenceItem, error => {
      callback(error);
    });
  }

}
