import * as moment from 'moment';

export class DateItem {
    public id: number;
    private _start_date: Date;
    private _end_date: Date;
    constructor(id?: number, start_date?: Date, end_date?: Date) {
        this.id = id;
        this._start_date = start_date;
        this._end_date = end_date;
    }

    get start_date(): Date {
        return moment(this._start_date).toDate();
    }

    get end_date(): Date {
        return moment(this._end_date).toDate();
    }
}

