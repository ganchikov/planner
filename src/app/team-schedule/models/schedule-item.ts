import * as moment from 'moment';
import {Absence, Team} from '@app/common/models';
import {IPerson} from '@app/common/models';
import {ITeam} from '@app/common/models';
import {Person} from '@app/common/models';
import {IAbsence} from '@app/common/models';

export class ScheduleItem extends Absence implements ITeam, IPerson {

    constructor(initializatorObj: Object) {
      super(initializatorObj, true);
      if (initializatorObj && initializatorObj.hasOwnProperty('members')) {
        const members: ScheduleItem[] = [];
        for (const memberObj of initializatorObj['members']) {
            const member = new ScheduleItem(memberObj);
            member.parent_id = this.id;
            members.push(member);
        }
        this.SetValue<ScheduleItem[]>('members', members);
      }
      if (initializatorObj && initializatorObj.hasOwnProperty('absences')) {
        const absences: ScheduleItem[] = [];
        for (const absenceObj of initializatorObj['absences']) {
            const absence = new ScheduleItem(absenceObj);
            absence.parent_id = this.id;
            absences.push(absence);
        }
        this.SetValue<ScheduleItem[]>('absences', absences);
      }
    }

    get members(): ScheduleItem[] {
      return this.GetValue('members');
    }

    get absences(): ScheduleItem[] {
      return this.GetValue('absences');
    }

    set absences(val: ScheduleItem[]) {
      this.SetValue<ScheduleItem[]>('absences', val);
    }

    get text(): string {
      return this.GetValue('text');
    }

    set text(val: string) {
      this.SetValue<string>('text', val);
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

    get unscheduled(): boolean {
      return this.GetValue('unscheduled');
    }

    set unscheduled(val: boolean) {
      this.SetValue('unscheduled', val);
    }

    get has_absences(): boolean {
        if (this.GetValue('absences') !== undefined && (this.GetValue('absences') as Array<Absence>).length > 0 ) {
          return true;
        } else {
          return false;
        }
    }

    get start_date(): Date {
      let date: Date;
      if (this.has_absences) {
        const absences: Absence[] = this.GetValue('absences');
        date = moment(absences[0].start_date).toDate();
        for (const absence of absences) {
            if (moment(absence.start_date).isBefore(moment(date))) {
                date = moment(absence.start_date).toDate();
            }
        }
        this.unscheduled = false;
      } else {
        if (this.GetValue('start_date') === undefined) {
            this.unscheduled = true;
            date = new Date(Date.now());
        } else {
          date = moment(this.GetValue('start_date')).toDate();
        }
      }
      return date;
    }

    set start_date(val: Date) {
      this.SetValue<Date>('start_date', val);
    }

    get end_date(): Date {
      let date: Date;
      if (this.has_absences) {
          const absences: Absence[] = this.GetValue('absences');
          date = moment(absences[0].end_date).toDate();
          for (const absence of absences) {
              if (moment(absence.end_date).isAfter(moment(date))) {
                  date = moment(absence.end_date).toDate();
              }
          }
          this.unscheduled = false;
      } else {
        if (this.GetValue('end_date') === undefined) {
            this.unscheduled = true;
            date = new Date(Date.now());
        } else {
          date = moment(this.GetValue('end_date')).toDate();
        }
      }
      return date;
    }

    set end_date(val: Date) {
      this.SetValue<Date>('end_date', val);
    }
  }
