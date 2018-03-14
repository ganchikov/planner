import * as mongoose from 'mongoose';
import {Schema, Model, Document, Connection} from 'mongoose';
import { ObjectId } from 'bson';

export {Schema, Model, Document} from 'mongoose';

const schemaOptions: mongoose.SchemaOptions = {
    id: false,
    _id: true,
    autoIndex: true
};

export class PlannerDataService {

    _teamSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        name: String,
        members: [{type: Schema.Types.ObjectId, ref: 'person'}]
    }, schemaOptions);

    _teamModel: Model<Document>;

    _personSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        absences: [{type: Schema.Types.ObjectId, ref: 'absence'}]
    }, schemaOptions);

    _personModel: Model<Document>;

    _absenceSchema: Schema = new Schema({
        _id: ObjectId,
        id: Number,
        person_id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        confirmed: Boolean
    }, schemaOptions);

    _absenceModel: Model<Document>;

    _connection: Connection;

    public get TeamModel(): Model<Document> {
        return this._teamModel;
    }

    public get PersonModel(): Model<Document> {
        return this._personModel;
    }

    public get AbsenceModel(): Model<Document> {
        return this._absenceModel;
    }

    constructor() {
    }

    private initModels(connection: Connection) {
        this._teamModel = connection.model('team', this._teamSchema);
        this._personModel = connection.model('person', this._personSchema);
        this._absenceModel = connection.model('absence', this._absenceSchema);
    }

    public Connect() {
        this._connection = mongoose.createConnection('mongodb://localhost:27017/plannerdb');
        this.initModels(this._connection);
    }

    public Disconnect() {
        if (this._connection) {
            this._connection.close();
        }
    }

    public AddTeams(teams: Object[], callback?: (teams: Object[]) => any) {
        this._teamModel.insertMany(teams, (err, teamDocs) => {
            if (err) {
                throw err;
            }
            let index = 0;
            for (const teamDoc of teamDocs) {
                const team = teams[index];
                team['_id'] = teamDoc._id;
                team['id'] = teamDoc.id;
                if (team.hasOwnProperty('members') && team['members'] instanceof Array) {
                    const members = team['members'] as Array<Object>;
                    this.AddPersons(members);
                }
                index++;
            }
            if (callback) {
                callback(teams);
            }
        });
    }

    public AddPersons(persons: Object[], callback?: (personDocs: Document[]) => any) {
        this.PersonModel.insertMany(persons, (err, personDocs) => {
            if (err) {
                throw err;
            }
            let index = 0;
            for (const personDoc of personDocs) {
                if (personDoc) {
                    const person = persons[index];
                    person['_id'] = personDoc._id;
                    person['id'] = personDoc.id;
                    if (person.hasOwnProperty('absences') && person['absences'] instanceof Array) {
                        const absences = person['absences'] as Array<Object>;
                        absences.map(absence => {
                            absence['person_id'] = personDoc.id;
                        });
                        this.AddAbsences(absences);
                    }
                    index++;
                }
            }
            if (callback) {
                callback(personDocs);
            }
        });
    }

    public AddAbsences(absences: Object[], callback?: (absenceDocs: Document[]) => any) {
        this.AbsenceModel.insertMany(absences, (err, absenceDocs) => {
            if (err) {
                throw err;
            }
            callback(absenceDocs);
        });
    }

    public GetTeams(callback: (err: any, result: Document) => any) {
        this._teamModel.find(callback);
    }

}
