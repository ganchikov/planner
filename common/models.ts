import {DataItem} from './DataItem';

export class Team extends DataItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);

        if (initializatorObj && initializatorObj.hasOwnProperty('members')) {
            const members: Person[] = [];
            for (const memberObj of initializatorObj['members']) {
                const member = new Person(memberObj);
                members.push(member);
            }
            this.SetValue<Person[]>('members', members);
        }
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

    get members(): Person[] {
        return this.GetValue('members');
    }
    set members(val: Person[]) {
        this.SetValue<Person[]>('members', val);
    }

}

export class Person extends DataItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
        if (initializatorObj && initializatorObj.hasOwnProperty('absences')) {
            const absences: Absence[] = [];
            for (const absObj of initializatorObj['absences']) {
                const absence = new Absence(absObj);
                absences.push(absence);
            }
            this.SetValue<Absence[]>('absences', absences);
        }
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

    get dateStart(): Date {
        return this.GetValue('dateStart');
    }
    set dateStart(val: Date) {
        this.SetValue<Date>('dateStart', val);
    }

    get dateEnd(): Date {
        return this.GetValue('dateEnd');
    }
    set dateEnd(val: Date) {
        this.SetValue<Date>('dateEnd', val);
    }

    get absences(): Absence[] {
        return this.GetValue('absences');
    }
    set absences(val: Absence[]) {
        this.SetValue<Absence[]>('dateEnd', val);
    }
}

export class Absence extends DataItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
    }

    get _id(): Object {
        return this.GetValue('_id');
    }
    set _id(val: Object) {
        this.SetValue<Object>('_id', val);
    }

    get type(): string {
        return this.GetValue('type');
    }
    set type(val: string) {
        this.SetValue<string>('type', val);
    }

    get name(): string {
        return this.GetValue('name');
    }
    set name(val: string) {
        this.SetValue<string>('name', val);
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

    get from(): Date {
        return this.GetValue('from');
    }
    set from(val: Date) {
        this.SetValue<Date>('from', val);
    }

    get to(): Date {
        return this.GetValue('to');
    }
    set to(val: Date) {
        this.SetValue<Date>('to', val);
    }
}

export const AbsenceTypes = ['vacation', 'sick leave', 'day off'];
