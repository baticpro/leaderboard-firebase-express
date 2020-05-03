import FirebaseManager from '../FirebaseManager';

const serviceAccount = require('../../adminkey.json');
import config from '../../firebase-config';

describe('testings firebase commands', () => {
  const databaseUrl = config.databaseURL;
  const gameId = 'hangman';
  const firebaseManager = new FirebaseManager(databaseUrl, serviceAccount);

  it('get leaders', async () => {
    const leaders = await firebaseManager.getLeaders(gameId, 'testing');
    console.log(leaders);
    expect(Array.isArray(leaders.leaders)).toEqual(true);
  });

  it('create leader', async () => {
    const scores = Math.floor(Math.random() * 50 + 50);
    const leader = await firebaseManager.createLeader(
      {
        device: 'iPhone 7',
        gameId: gameId,
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
