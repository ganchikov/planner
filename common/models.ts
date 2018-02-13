export class Team {
    constructor(
        public _id?: string,
        public id?: number,
        public name?: string,
        public members?: Person[]
    ) {}
}

export class Person {
    constructor(
        _id: string,
        name: string,
        dateStart: Date,
        dateEnd: Date,
        absences: Absence[]
    ) {}
}

export interface Absence {
    _id: string;
    type: string;
    name: string;
    confirmed: boolean;
    from: Date;
    to: Date;
}
