import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import {TeamDataService} from './services/TeamDataService';
import {MongoProvider} from './providers/MongoProvider';

import {Team} from '../common/models';
import {ObjectParser} from './common/Objectparser';

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

// REST API
app.get('/api/teams/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    teamDS.GetTeams(teams => {
        res.status(200).json(teams);
    }, err => {
        res.status(404).send(err);
    });
});

app.post('/api/teams/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    try {


        const item: Team = new Team();
        const result = ObjectParser.Parse(req.body, item);
        if (result instanceof Team) {
            teamDS.InsertTeam(item, resultItem => {
                res.status(200).json(resultItem);
            }, error => {
                res.status(404).send(error);
            });
        } else if (result instanceof Array) {
            teamDS.InsertTeams(result, resultItem => {
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


