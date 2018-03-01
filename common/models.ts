import {DataItem} from './DataItem';

export class BaseItem extends DataItem {
    constructor(initializatorObj: Object) {
        super (initializatorObj);
    }

    get _id(): Object {
        return this.GetValue('_id');
    }
    set _id(val: Object) {
        this.SetValue<Object>('_id', val);
    }

    get id(): number {
        return this.GetValue('id');
    }
    set id(val: number) {
        this.SetValue<number>('id', val);
    }

    get name(): string {
        return this.GetValue('name');
    }
    set name(val: string) {
        this.SetValue<string>('name', val);
    }

    get parent_id(): number {
        return this.GetValue('parent_id');
    }

    set parent_id(val: number) {
        this.SetValue<number>('parent_id', val);
    }


}

export class Team extends BaseItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);

        if (initializatorObj && initializatorObj.hasOwnProperty('members')) {
            const members: Person[] = [];
            for (const memberObj of initializatorObj['members']) {
                const member = new Person(memberObj);
                member.parent_id = this.id;
                members.push(member);
            }
            this.SetValue<Person[]>('members', members);
        }
    }

    get members(): Person[] {
        return this.GetValue('members');
    }
    set members(val: Person[]) {
        this.SetValue<Person[]>('members', val);
    }

}

export class Person extends BaseItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
        if (initializatorObj && initializatorObj.hasOwnProperty('absences')) {
            const absences: Absence[] = [];
            for (const absObj of initializatorObj['absences']) {
                const absence = new Absence(absObj);
                absence.parent_id = this.id;
                absences.push(absence);
            }
            this.SetValue<Absence[]>('absences', absences);
        }
    }

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

    get absences(): Absence[] {
        return this.GetValue('absences');
    }
    set absences(val: Absence[]) {
        this.SetValue<Absence[]>('dateEnd', val);
    }
}

export class Absence extends BaseItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
    }

    get confirmed(): boolean {
        if (this.GetValue('confirmed') === 'true') {
            return true;
        } else {
            return false;
        }
    }
    set confirmed(val: boolean) {
        this.SetValue<boolean>('confirmed', val);
    }

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

export const AbsenceTypes = ['vacation', 'sick leave', 'day off'];
