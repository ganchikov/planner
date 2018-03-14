import * as mongoose from 'mongoose';
import {Schema, Model, Document} from 'mongoose';
import { ObjectId } from 'bson';
import {IDataProvider} from '../common/IDataProvider';
import {DataItem} from '../../common/DataItem';


export class MongooseProvider implements IDataProvider {

    _teamSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        name: String,
        members: [ObjectId]
    });

    _personSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        absences: [ObjectId]
    });

    _scheduledItemSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        confirmed: Boolean
    });

    _isConnected = false;

    constructor() {}

    public get Collection(): string {
        return '';
    }

    public set Collection(name: string) {
    }

    public Connect(callback: () => void): void {

    }

    public Disconnect(): void {

    }
    public ReadItem<T extends DataItem> (key: any, success: (item: T) => void, failure: (err: any) => void) {

    }

    public ReadItems<T extends DataItem> (success: (items: T[]) => void, fail: (err: any) => void ) {

    }

    public InsertItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void) {

    }

    public InsertItems<T extends DataItem> (items: T[], success: (items: T[]) => void, error: (err: any) => void) {

    }

    public UpdateItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void) {

    }

    public DeleteItem<T extends DataItem> (item: T, success: (item: T) => void, failure: (err: any) => void) {

    }


}
