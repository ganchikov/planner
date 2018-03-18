import * as mongoose from 'mongoose';
import {Schema} from 'mongoose';
import SchemaOptions = mongoose.SchemaOptions;

const schemaOptions: SchemaOptions = {
    id: false,
    autoIndex: true
};

export const counterSchema: Schema = new Schema({
    _id: String,
    sequence_val: {type: Number, default: 1}
});

export const teamSchema: Schema = new Schema({
    id: Number,
    name: String,
    members: [{type: Schema.Types.ObjectId, ref: 'person'}]
}, schemaOptions);

export const personSchema: Schema = new Schema({
    id: Number,
    name: String,
    start_date: Date,
    end_date: Date,
    absences: [{type: Schema.Types.ObjectId, ref: 'absence'}]
}, schemaOptions);

export const absenceSchema: Schema = new Schema({
    id: Number,
    person_id: Number,
    name: String,
    start_date: Date,
    end_date: Date,
    confirmed: Boolean
}, schemaOptions);

