import {BaseItem} from './base-item';

export class BaseScheduledItem extends BaseItem {

    get start_date(): Date {
        return this.GetValue('start_date');
    }
    set start_date(val: Date) {
        this.SetValue<Date>('start_date', val);
    }

    get end_date(): Date {
        return this.GetValue('end_date');
    }
    set end_date(val: Date) {
        this.SetValue<Date>('end_date', val);
    }
}
