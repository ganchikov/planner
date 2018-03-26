import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

import {TeamDataService} from './services/TeamDataService';
import * as DS from './services/PlannerDataService/main';

import {MongoProvider} from './providers/MongoProvider';

const app = express();

// const teamDS: TeamDataService = new TeamDataService(new MongoProvider(undefined, 'plannerdb'));

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

app.get('/api/teams', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    const filterCriteria = req.body as Object;
    DS.GetTeamsDataSet(filterCriteria, (err, teamDocs) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(teamDocs.map(team => team.toJSON()));
        }
    });
});

app.post('/api/teams', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    if (req.body instanceof Array) {
        DS.InsertTeamsDataSet(req.body as Array<Object>, (err, teamDocs) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json(teamDocs.map(team => team.toJSON()));
            }
        });
    } else {
        res.status(200).send({});
    }
});

app.post('/api/absence', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    DS.InsertAbsence(req.body, (err, absenceDoc) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(absenceDoc.toJSON());
        }
    });
});

app.put('/api/person', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    DS.UpdatePerson(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});

app.put('/api/absence', (req, res) => {
    res.set({'Content-Type' : 'text/json', 'Access-Control-Allow-Origin' : '*'});
    DS.UpdateAbsence(req.body, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
});



const server = app.listen(8001, 'localhost', () => {
    const {address, port} = server.address();
    console.log(`Process ${process.pid} is listening on http://localhost:` + port);

    DS.Connect(error => {
        if (error) {
            console.log('failed to connect to database: ' + error);
            process.exit();
        } else {
            console.log('connected to database');
        }

    });
});

const finalize = () => {
    console.log('Finalizing');
    // teamDS.Disconnect();
    DS.Disconnect(error => {
        if (error) {
            console.log('failed to disconnect from database, exiting...');
        }
    });
    process.exit(0);
};

process.on('SIGBREAK', finalize);
process.on('SIGTERM', finalize);
process.on('SIGHUP', finalize);
process.on('SIGINT', finalize);
process.on('unhandledRejection', (reason) => {
    console.log(reason);
});


