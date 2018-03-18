import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import {TeamDataService} from './services/TeamDataService';
import * as DS from './services/PlannerDataService/main';

import {MongoProvider} from './providers/MongoProvider';

import {Team} from '../common/models';

const app = express();

const teamDS: TeamDataService = new TeamDataService(new MongoProvider(undefined, 'plannerdb'));

app.use(bodyParser.json());

// used for avoid CORS error - debug only (prod code will be served as static)
app.options('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

// static section
app.use('/', express.static(path.join(__dirname, '..', '..', 'dist')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    console.log('requested landing page');
});

// REST API TEST

app.get('/api/test/teams', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    res.status(200).send('not implemented');
});

app.post('/api/test/teams', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    try {
        if (req.body instanceof Array) {
            DS.InsertTeamsDataSet(req.body as Array<Object>, teams => {
                res.status(200).json(teams.map(team => team.toJSON()));
            });
        } else {
            res.status(200).send({});
        }
    } catch (err) {
        res.status(404).send('bad request: ' + err);
    }
});

// REST API
app.get('/api/teams/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    teamDS.GetTeams(teams => {
        const jsonObjects: Object[] = [];
        teams.forEach(team => jsonObjects.push(team.GetObject()));
        res.status(200).json(jsonObjects);
    }, err => {
        res.status(404).send(err);
    });
});

app.post('/api/teams/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    try {
        if (req.body instanceof Array) {
            const teams: Team[] = [];
            (req.body as Array<any>).forEach(item => teams.push(new Team(item)));
            teamDS.InsertTeams(teams, resultItems => {
                res.status(200).json(resultItems);
            }, error => {
                res.status(404).send(error);
            });
        } else {
            teamDS.InsertTeam(new Team(req.body), resultItem => {
                res.status(200).json(resultItem);
            }, error => {
                res.status(404).send(error);
            });
        }
    } catch (err) {
        res.status(404).send('bad request: ' + err);
    }
});

const server = app.listen(8001, 'localhost', () => {
    const {address, port} = server.address();
    console.log('Listening on http://localhost:' + port);
});

const finalize = () => {
    console.log('Finalizing');
    teamDS.Disconnect();
    process.exit(0);
};

process.on('SIGBREAK', finalize);
process.on('SIGTERM', finalize);
process.on('SIGHUP', finalize);
process.on('SIGINT', finalize);


