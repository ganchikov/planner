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

const MAX_TEAM_MEMBERS = 100;
const MAX_PERSON_ABSENCES = 1000;

export class Team extends BaseItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);

        if (initializatorObj && initializatorObj.hasOwnProperty('members')) {
            const members: Person[] = [];
            // let memberId: number = MAX_TEAM_MEMBERS * this.id;
            for (const memberObj of initializatorObj['members']) {
                const member = new Person(memberObj);
                // member.id = memberId;
                member.parent_id = this.id;
                members.push(member);
                // memberId++;
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

export class Person extends BaseScheduledItem {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
        if (initializatorObj && initializatorObj.hasOwnProperty('absences')) {
            const absences: ScheduledConfirmableItem[] = [];
            // let absenceId: number = MAX_PERSON_ABSENCES * this.id;
            for (const absObj of initializatorObj['absences']) {
                const absence = new ScheduledConfirmableItem(absObj);
                absence.parent_id = absence.GetValue('person_id');
                // absence.id = absenceId;
                absences.push(absence);
                // absenceId++;
            }
            this.SetValue<ScheduledConfirmableItem[]>('absences', absences);
        }
    }

    get absences(): ScheduledConfirmableItem[] {
        return this.GetValue('absences');
    }
    set absences(val: ScheduledConfirmableItem[]) {
        this.SetValue<ScheduledConfirmableItem[]>('dateEnd', val);
    }
}

export class ScheduledConfirmableItem extends BaseScheduledItem {
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

}


export const AbsenceTypes = ['vacation', 'sick leave', 'day off'];
