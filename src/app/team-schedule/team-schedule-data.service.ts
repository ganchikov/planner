import { TeamScheduleItem } from './models/team-schedule-item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamScheduleDataService {

  constructor() { }

  public getTeamSchedule(callback: (items: TeamScheduleItem[]) => void) {

  }

  public insertAbsence(newAbsence: TeamScheduleItem,
    parentPerson: TeamScheduleItem,
    callback: (insertedAbsence: TeamScheduleItem, err: any) => void) {

  }

  public updateAbsence(absenceItem: TeamScheduleItem,
    callback: (error) => void) {

  }

  deleteAbsence(absenceId: Object, callback: (error) => void) {

  }
}
