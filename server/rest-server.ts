import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import {TeamDataService} from './services/TeamDataService';
import {MongoProvider} from './providers/MongoProvider';

import {Team} from '../common/models';

const app = express();

const teamDS: TeamDataService = new TeamDataService(new MongoProvider());

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
app.get('api/teams/', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    teamDS.GetTeams(teams => {
        res.status(200).json(teams);
    }, err => {
        res.status(404).send(err);
    });
});

