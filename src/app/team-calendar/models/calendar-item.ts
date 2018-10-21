import * as moment from 'moment';
import { ModelType, AbsenceType } from '@app/common/enums';
import { BaseItem } from '@app/common/models';
import { DateItem } from './date-item';
import { Duration } from './duration';

export class CalendarItem extends BaseItem {

    constructor(initializatorObj: Object) {
      super(initializatorObj);
    }

    get text(): string {
      return this.GetValue('text');
    }

    set text(val: string) {
      this.SetValue<string>('text', val);
    }

    get person(): Object {
      return this.GetValue('person');
    }

    set person(person_id: Object) {
      this.SetValue<Object>('person', person_id);
    }

    get confirmed(): boolean {
      return this.GetValue('confirmed');
    }

    set confirmed(val: boolean) {
      this.SetValue<boolean>('confirmed', val);
    }

    get parent(): number {
      return this.GetValue('parent_id');
    }

    set parent(parent: number) {
      this.SetValue<number>('parent_id', parent);
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

    get start_date(): Date {
      return moment(this.GetValue('start_date')).toDate();
    }

    set start_date(val: Date) {
      this.SetValue<Date>('start_date', val);
    }

    get end_date(): Date {
      return moment(this.GetValue('end_date')).toDate();
    }

    set end_date(val: Date) {
      this.SetValue<Date>('end_date', val);
    }

    get model_type(): ModelType {
      return this.GetValue('model_type');
    }

    set model_type(val: ModelType) {
      this.SetValue<ModelType>('model_type', val);
    }

    get schedule_dates(): DateItem[] {
      return this.GetValue('schedule_dates');
    }

    get absence_type(): AbsenceType {
      return this.GetValue('absence_type');
    }

    public recalculateStartEndDates() {
      if (this.schedule_dates.length === 0) {
        this.start_date = new Date(Date.now());
        this.end_date = new Date(Date.now());
        return;
      }
      let min_date: Date = this.schedule_dates[0].start_date;
      let max_date: Date = this.schedule_dates[0].end_date;
      for (const date of this.schedule_dates) {
        if (moment(date.start_date).isBefore(min_date)) {min_date = date.start_date; }
        if (moment(date.end_date).isAfter(max_date)) {max_date = date.end_date; }
      }
      this.start_date = min_date;
      this.end_date = max_date;
    }

    public sortScheduleDates() {
      this.schedule_dates.sort((a, b) => {
        if (moment(a.start_date).isAfter(b.start_date)) {return 1; } else
        if (moment(a.start_date).isBefore(b.start_date)) {return -1; }
        return 0;
      });
    }

    public getAbsoluteDurations(): Duration[] {
      this.recalculateStartEndDates();
      const durations: Duration[] = [];
      for (const dateItem of this.schedule_dates) {
        const offset: number = moment(dateItem.start_date).diff(moment(this.start_date), 'days');
        const duration: number = moment(dateItem.end_date).diff(moment(dateItem.start_date), 'days');
        durations.push(new Duration(offset, duration));
      }
      return durations;
    }

    public getTotalDuration(): number {
      return moment(this.end_date).diff(moment(this.start_date), 'days');
    }

  }
