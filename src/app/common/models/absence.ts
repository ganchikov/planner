import {AbsenceType} from '../enums/absence-type';
import {ModelType} from '../enums/model-type';

import {BaseScheduledItem} from './base-scheduled-item';
import { ObjectID } from 'bson';

export class Absence extends BaseScheduledItem {
    constructor(
        initializatorObj: Object,
        ignore_object_type?: boolean
    ) {
        super(initializatorObj);
        if (!ignore_object_type) {
            this.model_type = ModelType.absence;
        }
    }

    get person(): Object {
        return this.GetValue('person');
    }

    set person(val: Object) {
        this.SetValue<Object>('person', val);
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
