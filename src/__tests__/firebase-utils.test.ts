import FirebaseManager from '../FirebaseManager';

const serviceAccount = require('../../adminkey.json');
import config from '../../firebase-config';

describe('testings firebase commands', () => {
  const databaseUrl = config.databaseURL;
  const firebaseManager = new FirebaseManager(databaseUrl, serviceAccount);

  it('get leaders', async () => {
    const leaders = await firebaseManager.getLeaders('testing');
    expect(Array.isArray(leaders)).toEqual(true);
  });

  it('create leader', async () => {
    const scores = Math.floor(Math.random() * 50 + 50);
    const leader = await firebaseManager.createLeader(
      {
        device: 'iPhone 7',
        gameId: 'hangman',
        lang: 'ru',
        os: 'iOS',
        deviceId: 'testingId',
        scores: scores,
        name: 'Testing Test',
      },
      'testing',
    );

    console.log(leader);
  });
});
