import * as mongoose from 'mongoose';
import {Model, Document} from './imports';
import * as $s from './schemas';
import {Team, Absence} from '../../../common/models';

const connectionOptions: mongoose.ConnectionOptions = {
    reconnectTries: 1,
    reconnectInterval: 1
};

let counterModel: Model<Document>;
let teamModel: Model<Document>;
let personModel: Model<Document>;
let absenceModel: Model<Document>;

export function Connect(callback: (error) => void) {
    mongoose.connect('mongodb://localhost:27017/plannerdb', connectionOptions, error => {
        if (error) {
            callback(error);
        }
    });
    mongoose.connection.on('open', () => {
        counterModel = mongoose.connection.model('counter', $s.counterSchema);
        teamModel = mongoose.connection.model('team', $s.teamSchema);
        personModel = mongoose.connection.model('person', $s.personSchema);
        absenceModel = mongoose.connection.model('absence', $s.absenceSchema);
        mongoose.connection.on('error', error => {
            callback(error);
        });
    });
}


export function Disconnect(callback: (error) => void) {
    mongoose.disconnect().then(() => {
        callback(null);
    }).catch(error => {
        callback(error);
    });
}

async function getCounterIncrement(counter_id: string): Promise<number> {

    let counterDoc = await counterModel.findByIdAndUpdate({_id: counter_id}, {$inc: {sequence_val: 1}}, {new: true});
    if (!counterDoc) {
        counterDoc = await counterModel.create({_id: counter_id, sequence_val: 1});
    }
    return counterDoc['sequence_val'];
}

export async function InsertTeamsDataSet(teams: Object[], callback: (err: any, teamDocs: Document[]) => void) {
    try {
        const teamItems: Team[] = [];
        teams.forEach(item => teamItems.push(new Team(item)));
        const teamDocs = [];
        for (const teamItem of teamItems) {
            const teamDoc: Document = await teamModel.create(
                teamItem.SetValue('id', await getCounterIncrement('universal')).GetObject(true));
            for (const personItem of teamItem.members) {
                const personDoc: Document = await personModel.create(
                    personItem.SetValue('id', await getCounterIncrement('universal')).GetObject(true));
                for (const absenceItem of personItem.absences) {
                    const absenceDoc: Document = await absenceModel.create(
                        absenceItem.SetValue('id', await getCounterIncrement('universal'))
                        .SetValue('person_id', personItem.id).GetObject());
                        personDoc['absences'].push(absenceDoc._id);
                }
                await personDoc.save();
                teamDoc['members'].push(personDoc._id);
            }
            await teamDoc.save();
            teamDocs.push(teamDoc);
        }
        await teamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}});
        callback(null, teamDocs);
    } catch (err) {
        callback (err, null);
    }
}

export function GetTeamsDataSet(filter: Object, callback: (err: any, teamDocs: Document[]) => void) {
    try {
        teamModel.find(filter, (err, teamDocs) => {
            if (!err) {
                teamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}}, (error, popDocs) => {
                    callback(error, popDocs);
                });
            } else {
                callback(err, null);
            }
        });
    } catch (err) {
        callback(err, null);
    }
}

export async function InsertAbsence(absenceObj: Object, callback: (err: any, absenceDoc: Document) => void) {
    try {
        const absenceItem: Absence = new Absence(absenceObj);
        absenceModel.create(absenceItem.SetValue('id', await getCounterIncrement('universal')).GetObject(true), (err, absenceDoc) => {
            callback(err, absenceDoc);
        });
    } catch (err) {
        callback(err, null);
    }

}

export function UpdatePerson(personObj: Object, callback: (err: any, absenceDoc: Document) => void) {
    try {
        personModel.updateOne({_id: personObj['_id']}, personObj, (err, result) => {
            callback(err, result);
        });
    } catch (err) {
        callback(err, null);
    }
}

