import {Person, Absence, ITeam, IPerson, IAbsence} from '../../../common/models';
import * as moment from 'moment';

export class GanttItem  {
    text: string;
    parent: number;
    type: 'task';
    open: true;
    unscheduled: false;
    start_date: Date;
    end_date: Date;
}

export class TeamGanttItem extends Absence implements ITeam, IPerson {

  constructor(initializatorObj: Object) {
    super(initializatorObj, true);

    if (initializatorObj && initializatorObj.hasOwnProperty('members')) {
      const members: TeamGanttItem[] = [];
      for (const memberObj of initializatorObj['members']) {
          const member = new TeamGanttItem(memberObj);
          member.parent_id = this.id;
          members.push(member);
      }
      this.SetValue<TeamGanttItem[]>('members', members);
    }

    if (initializatorObj && initializatorObj.hasOwnProperty('absences')) {
      const absences: TeamGanttItem[] = [];
      for (const absenceObj of initializatorObj['absences']) {
          const absence = new TeamGanttItem(absenceObj);
          absence.parent_id = this.id;
          absences.push(absence);
      }
      this.SetValue<TeamGanttItem[]>('absences', absences);
    }
  }

  get members(): TeamGanttItem[] {
    return this.GetValue('members');
  }

  get absences(): TeamGanttItem[] {
    return this.GetValue('absences');
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

    get is_complex(): boolean {
        if (this.GetValue('absences') !== undefined && (this.GetValue('absences') as Array<Absence>).length > 0 ) {
          return true;
        } else {
          return false;
        }
    }

    get start_date(): Date {
      let date: Date;
      if (this.is_complex) {
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

    get end_date(): Date {
      let date: Date;
      if (this.is_complex) {
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
}
