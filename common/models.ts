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
        public _id: string,
        public id: number,
        public name: string,
        public dateStart: Date,
        public dateEnd: Date,
        public absences: Absence[]
    ) {}
}

export class Absence {
    constructor(
        public _id: string,
        public type: string,
        public name: string,
        public confirmed: boolean,
        public from: Date,
        public to: Date
    ) {}
}
