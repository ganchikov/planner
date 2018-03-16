import * as mongoose from 'mongoose';
import {Schema, Model, Document, Connection} from 'mongoose';
import ObjectId = Schema.Types.ObjectId;


import {Team} from '../../common/models';


export {Schema, Model, Document} from 'mongoose';

const deepPopulate = require('mongoose-deep-populate')(mongoose);

const schemaOptions: mongoose.SchemaOptions = {
    id: false,
    autoIndex: true
};

export class PlannerDataService {

    _teamSchema: Schema = (new Schema({
        // id: Number,
        name: String,
        members: [{type: Schema.Types.ObjectId, ref: 'person'}]
    }, schemaOptions)).plugin(deepPopulate, {});

    _teamModel: Model<Document>;

    _personSchema: Schema = (new Schema({
        // id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        absences: [{type: Schema.Types.ObjectId, ref: 'absence'}]
    }, schemaOptions)).plugin(deepPopulate, {});

    _personModel: Model<Document>;

    _absenceSchema: Schema = (new Schema({
        // id: Number,
        // person_id: Number,
        name: String,
        start_date: Date,
        end_date: Date,
        confirmed: Boolean
    }, schemaOptions)).plugin(deepPopulate, {});

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


    public async AddTeamsAsync(teams: Object[]): Promise<Document[]> {
        return await this._teamModel.insertMany(teams);
    }

    public async AddPersonsAsync(persons: Object[]): Promise<Document[]> {
        return await this._personModel.insertMany(persons);
    }

    public async AddAbsencesAsync(absences: Object[]): Promise<Document[]> {
        return await this._absenceModel.insertMany(absences);
    }

    public async InsertTeamsDataSet(teams: Object[], callback: (teamDocs: Document[]) => void) {
        if (!this._connection) {this.Connect(); }
        const teamItems: Team[] = [];
        teams.forEach(item => teamItems.push(new Team(item)));
        const teamDocs = [];
        for (const teamItem of teamItems) {
            const teamDoc: Document = await this.TeamModel.create(teamItem.GetObject(true));
            const personIds: Array<ObjectId> = new Array();
            const personDocs = [];
            for (const personItem of teamItem.members) {
                const personDoc: Document = await this.PersonModel.create(personItem.GetObject(true));
                const absenceIds: Array<ObjectId> = new Array();
                for (const absenceItem of personItem.absences) {
                    const absenceDoc: Document = await this.AbsenceModel.create(absenceItem.GetObject());
                    absenceIds.push(absenceDoc._id);
                }
                personDoc['absences'].push(absenceIds);
                await personDoc.save();
                 personIds.push(personDoc._id);
            }
            teamDoc['members'].push(personIds);
            teamDocs.push(teamDoc);
        }
        this.TeamModel.updateMany({}, teamDocs);
        await this.TeamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}});
        callback(teamDocs);
    }



    public InsertTeams(teams: Object[], callback?: (teams: Object[]) => any) {
        this._teamModel.insertMany(teams, async (err, teamDocs) => {
            if (err) {
                throw err;
            }
            let team_index = 0;
            for (const teamDoc of teamDocs) {
                const team = teams[team_index];
                team['_id'] = teamDoc._id;
                team['id'] = teamDoc.id;
                if (team.hasOwnProperty('members') && team['members'] instanceof Array) {
                    const members = team['members'] as Array<Object>;
                    this.AddPersons(members);
                }
                team_index++;
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
