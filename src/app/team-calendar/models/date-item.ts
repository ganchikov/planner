import * as moment from 'moment';

export class DateItem {
    public id: number;
    public start_date: Date;
    public end_date: Date;
    constructor(id?: number, start_date?: Date, end_date?: Date) {
        this.id = id;
        this.start_date = moment(start_date).toDate();
        this.end_date = moment(end_date).toDate();
    }
}

