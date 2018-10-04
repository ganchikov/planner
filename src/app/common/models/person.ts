import {BaseScheduledItem} from './base-scheduled-item';
import {ModelType} from '../enums/model-type';
import {Absence} from './absence';

export class Person extends BaseScheduledItem  {
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
