import * as mongoose from 'mongoose';
import {Schema, Model, Document, Connection} from 'mongoose';
import ObjectId = Schema.Types.ObjectId;
import * as Schemas from './schema';
import {Team} from '../../../common/models';

export {Schema, Model, Document} from 'mongoose';

const connection: Connection = mongoose.createConnection('mongodb://localhost:27017/plannerdb');

const counterModel: Model<Document> = connection.model('counter', Schemas.counterSchema);
const teamModel: Model<Document> = connection.model('team', Schemas.teamSchema);
const personModel: Model<Document> = connection.model('person', Schemas.personSchema);
const absenceModel: Model<Document> = connection.model('absence', Schemas.absenceSchema);

export function Disconnect() {
    if (connection) {
        connection.close();
    }
}

async function getCounterIncrement(counter_id: string): Promise<number> {
    let counterDoc = await counterModel.findByIdAndUpdate({_id: counter_id}, {$inc: {sequence_val: 1}});
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
            teamItem.SetValue('id', await getCounterIncrement(teamModel.collection.name)).GetObject(true));
        const personIds: Array<ObjectId> = new Array();
        for (const personItem of teamItem.members) {
            const personDoc: Document = await personModel.create(
                personItem.SetValue('id', await getCounterIncrement(personModel.collection.name)).GetObject(true));
            const absenceIds: Array<ObjectId> = new Array();
            for (const absenceItem of personItem.absences) {
                const absenceDoc: Document = await absenceModel.create(
                    absenceItem.SetValue('id', await getCounterIncrement(absenceModel.collection.name))
                    .SetValue('person_id', personItem.id).GetObject());
                absenceIds.push(absenceDoc._id);
            }
            personDoc['absences'].push(absenceIds);
            await personDoc.save();
             personIds.push(personDoc._id);
        }
        teamDoc['members'].push(personIds);
        teamDocs.push(teamDoc);
    }
    teamModel.updateMany({}, teamDocs);
    await teamModel.populate(teamDocs, {path: 'members', populate: {path: 'absences'}});
    callback(teamDocs);
}
