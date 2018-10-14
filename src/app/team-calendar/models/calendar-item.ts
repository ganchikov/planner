import { PageNotFoundComponent } from './../../core/components/pagenotfound/pagenotfound.component';
import { ModelType, AbsenceType } from '@app/common/enums';
import { BaseItem } from '@app/common/models';
import * as moment from 'moment';
import {Absence, Team} from '@app/common/models';
import {ITeam} from '@app/common/models';
import {Person} from '@app/common/models';
import { DateItem } from '@app/team-calendar/models/date-item';

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

    get dates(): DateItem[] {
      return this.GetValue('dates');
    }

    get absence_type(): AbsenceType {
      return this.GetValue('absence_type');
    }
  }
