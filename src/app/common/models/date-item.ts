import * as moment from 'moment';

export class DateItem {
    id: number;
    start_date: Date;
    end_date: Date;
    constructor(id?: number, start_date?: Date, end_date?: Date) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
    }
}

