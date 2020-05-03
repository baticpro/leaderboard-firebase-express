import * as express from 'express';
import FirebaseManager from './src/FirebaseManager';
const serviceAccount = require('./adminkey.json');
import config from './firebase-config';
import Encrypter from './src/Encrypter';
import bodyParser = require('body-parser');

const app = express();
const firebaseManager = new FirebaseManager(config.databaseURL, serviceAccount);
const encrypter = new Encrypter();

app.use(bodyParser.urlencoded({ extended: true }));

// get all
app.get('/leaders/:game', async (req, res) => {
  const { game } = req.params;
  const leaders = await firebaseManager.getLeaders(game);
  const response = encrypter.encrypt(leaders);

  res.send(response);
});

// set leader
app.post('/leaders/set', async (req, res) => {
  const crypter = req.body.data;
  console.log(req.body);

  try {
    const data = encrypter.decrypt(crypter);
    console.log(data);

    const leader = await firebaseManager.createLeader(data);
    console.log(leader);

    const response = encrypter.encrypt(leader);
    console.log(response);

    res.send(response);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(500).send('something gone wrong');
  }
});

app.listen(3000, () => {
  console.log('available on http://localhost:3000');
});
