import {BaseItem, Absence} from '../../../common/models';
import * as moment from 'moment';

export class GanttItem extends BaseItem  {

      protected _unscheduled: boolean;

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

      get start_date(): Date {
        let date: Date = new Date(this.GetValue('start_date'));
        if (date === undefined || isNaN(date.getDate())) {
            this._unscheduled = true;
            date = new Date(Date.now());
        }
        return date;
      }

      set start_date(val: Date) {
        this.SetValue<Date>('start_date', val);
      }

      get end_date(): Date {
        let date: Date = new Date(this.GetValue('end_date'));
        if (date === undefined || isNaN(date.getDate())) {
            this._unscheduled = true;
            date = new Date(Date.now());
        }
        return date;
      }

      set end_date(val: Date) {
        this.SetValue<Date>('end_date', val);
      }

      get confirmed(): boolean {
        return this.GetValue('confirmed');
      }

      set confirmed(val: boolean) {
        this.SetValue('confirmed', val);
      }

      get unscheduled(): boolean {
        return this._unscheduled;
      }

      set unscheduled(val: boolean) {
        this._unscheduled = val;
      }

}

export class TeamGanttItem extends GanttItem {
    private _iscomplex: boolean;

    get is_complex(): boolean {
        if (this._iscomplex === undefined) {
            if (this.GetValue('absences') !== undefined &&
            (this.GetValue('absences') as Array<Absence>).length > 0 ) {
            this._iscomplex = true;
            } else {
            this._iscomplex = false;
            }
        }
        return this._iscomplex;
    }

    get end_date(): Date {
        let date: Date = new Date(this.GetValue('end_date'));
        if (date === undefined || isNaN(date.getDate())) {
            if (this.is_complex) {
                const absences: Absence[] = this.GetValue('absences');
                date = absences[0].end_date;
                for (const absence of absences) {
                    if (moment(absence.end_date).isAfter(moment(date))) {
                        date = absence.end_date;
                    }
                }
            } else {
                this._unscheduled = true;
                date = new Date(Date.now());
            }
        }
        return date;
      }
}
