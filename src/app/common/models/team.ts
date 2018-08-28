import {BaseItem} from './base-item';
import {ModelType} from '../enums/model-type';
import {Person} from '../models/person';

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