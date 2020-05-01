import * as firebase from 'firebase-admin';
import config from './firebase-config';
import * as express from 'express';
import {createLeader, getLeaders} from "./src/firebase-utils";
import {Leader} from "./src/types";
import * as bodyParser from "body-parser";

const serviceAccount = require('./adminkey.json')

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: config.databaseURL
});

const db = firebase.firestore();
const app = express();

app.use(bodyParser.json());

// get all
app.get('/leaders', async (req, res) => {
    const leaders = await getLeaders(db);
    res.send(JSON.stringify(leaders));
});

// set leader
app.post('/leaders/set/:id', async (req, res) => {
    const {id} = req.params;
    const data: Leader = {...req.body};
    data.deviceId = id;

    const response = await createLeader(db, data);
    res.send(JSON.stringify(response));
});

app.listen(3000, () => {
    console.log('available on http://localhost:3000');
});
