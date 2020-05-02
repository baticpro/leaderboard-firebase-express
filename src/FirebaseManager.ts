import { Leader } from './types';
import * as firebase from 'firebase-admin';
import config from '../firebase-config';

class FirebaseManager {
  private db: FirebaseFirestore.Firestore;

  constructor(databaseURL, serviceAccount) {
    if (serviceAccount)
      firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: config.databaseURL,
      });

    this.db = firebase.firestore();
  }

  public getLeaders = async (collectionName = 'leaders'): Promise<Leader[]> => {
    const collection = await this.db
      .collection(collectionName)
      .orderBy('scores', 'desc')
      .limit(100)
      .get();
    return collection.docs.map((item) => {
      return item.data() as Leader;
    });
  };

  public createLeader = async (data: Leader, collectionName = 'leaders') => {
    return await this.db.collection(collectionName).doc(data.deviceId).set(data);
  };
}

export default FirebaseManager;
