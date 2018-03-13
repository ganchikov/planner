import {ScheduledConfirmableItem} from '../../../common/models';
import * as moment from 'moment';

export class GanttItem extends ScheduledConfirmableItem  {

      get text(): string {
        return this.name;
      }

      set text(val: string) {
        this.name = val;
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

}

export class TeamGanttItem extends GanttItem {

    get is_complex(): boolean {
        if (this.GetValue('absences') !== undefined && (this.GetValue('absences') as Array<ScheduledConfirmableItem>).length > 0 ) {
          return true;
        } else {
          return false;
        }
    }

    get start_date(): Date {
      let date: Date;
      if (this.is_complex) {
        const absences: ScheduledConfirmableItem[] = this.GetValue('absences');
        date = moment(absences[0].start_date).toDate();
        for (const absence of absences) {
            if (moment(absence.start_date).isBefore(moment(date))) {
                date = moment(absence.start_date).toDate();
            }
        }
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
          const absences: ScheduledConfirmableItem[] = this.GetValue('absences');
          date = moment(absences[0].end_date).toDate();
          for (const absence of absences) {
              if (moment(absence.end_date).isAfter(moment(date))) {
                  date = moment(absence.end_date).toDate();
              }
          }
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
