import {DataItem} from './data-item';
import {ModelType} from '../enums/model-type';

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

    get model_type(): ModelType {
        return this.GetValue('model_type');
    }

    set model_type(val: ModelType) {
        this.SetValue<ModelType>('model_type', val);
    }
}
