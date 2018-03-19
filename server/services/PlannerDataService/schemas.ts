import {Schema, SchemaOptions} from './imports';

const schemaOptions: SchemaOptions = {
    id: false,
    autoIndex: true
};

export const counterSchema: Schema = new Schema({
    _id: String,
    sequence_val: {type: Number, default: 1}
});

export const teamSchema: Schema = new Schema({
    id: {type: Number, index: true, unique: true},
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'person'}]
}, schemaOptions);

export const personSchema: Schema = new Schema({
    id: {type: Number, index: true, unique: true},
    name: String,
    start_date: Date,
    end_date: Date,
    absences: [{type: Schema.Types.ObjectId, ref: 'absence'}]
}, schemaOptions);

export const absenceSchema: Schema = new Schema({
    id: {type: Number, index: true, unique: true},
    person_id: Number,
    name: String,
    start_date: Date,
    end_date: Date,
    confirmed: Boolean
}, schemaOptions);

