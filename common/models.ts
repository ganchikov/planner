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

    // get parent_object(): BaseItem {
    //     return this.GetValue('parent_object');
    // }

    // set parent_object(val: BaseItem) {
    //     // this.SetValue<BaseItem>('parent_object', val);
    //     this.parent_id = val.id;
    // }

    get parent_id(): number {
        // if (this.parent_object) {
        //     return this.parent_object.id;
        // } else {
            return this.GetValue('parent_id');
        // }
    }

    set parent_id(val: number) {
        this.SetValue<number>('parent_id', val);
    }

    get model_type(): ModelType {
        return this.GetValue('model_type');
    }

    set model_type(val: ModelType) {
        this.SetValue<ModelType>('model_type', val);
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

export interface ITeam {
    members: Person[];
}

export class Team extends BaseItem implements ITeam {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);

        this.model_type = ModelType.team;

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

export interface IPerson {
    absences: Absence[];
}

export class Person extends BaseScheduledItem implements IPerson {
    constructor(
        initializatorObj: Object
    ) {
        super(initializatorObj);
        this.model_type = ModelType.person;
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

    get absences(): Absence[] {
        return this.GetValue('absences');
    }
    set absences(val: Absence[]) {
        this.SetValue<Absence[]>('dateEnd', val);
    }
}

export interface IAbsence {
    confirmed: boolean;
    absence_type: AbsenceType;
}

export class Absence extends BaseScheduledItem implements IAbsence {
    constructor(
        initializatorObj: Object,
        ignore_object_type?: boolean
    ) {
        super(initializatorObj);
        if (!ignore_object_type) {
            this.model_type = ModelType.absence;
        }
    }

    get confirmed(): boolean {
        return this.GetValue('confirmed');
    }
    set confirmed(val: boolean) {
        this.SetValue<boolean>('confirmed', val);
    }

    get absence_type(): AbsenceType {
        return this.GetValue('absence_type');
    }

    set absence_type(val: AbsenceType) {
        this.SetValue<AbsenceType>('absence_type', val);
    }

}

export enum ModelType {
    team = 'team',
    person = 'person',
    absence = 'absence'
}

export enum AbsenceType {
    vacation = 'vacation',
    sickleave = 'sick leave',
    dayoff = 'day off'
}
