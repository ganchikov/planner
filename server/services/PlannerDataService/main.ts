import * as mongoose from 'mongoose';
import {Model, Document, Connection} from './imports';
import * as $s from './schemas';
import {Team} from '../../../common/models';

const connection: Connection = mongoose.createConnection('mongodb://localhost:27017/plannerdb');

const counterModel: Model<Document> = connection.model('counter', $s.counterSchema);
const teamModel: Model<Document> = connection.model('team', $s.teamSchema);
const personModel: Model<Document> = connection.model('person', $s.personSchema);
const absenceModel: Model<Document> = connection.model('absence', $s.absenceSchema);

export function Disconnect() {
    if (connection) {
        connection.close();
    }
}

async function getCounterIncrement(counter_id: string): Promise<number> {
    let counterDoc = await counterModel.findByIdAndUpdate({_id: counter_id}, {$inc: {sequence_val: 1}}, {new: true});
    if (!counterDoc) {
        counterDoc = await counterModel.create({_id: counter_id, sequence_val: 1});
    }
    return counterDoc['sequence_val'];
}

export async function InsertTeamsDataSet(teams: Object[], callback: (teamDocs: Document[]) => void) {
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
    // await teamModel.updateMany({}, teamDocs);
    await teamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}});
    callback(teamDocs);
}

export function GetTeamsDataSet(filter: Object, callback: (err: any, teamDocs: Document[]) => void) {
    teamModel.find(filter, (err, teamDocs) => {
        if (!err) {
            teamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}}, (inn_err, popDocs) => {
                callback(inn_err, popDocs);
            });
        } else {
            callback(err, []);
        }
    });
}


