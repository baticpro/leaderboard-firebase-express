import {Leader} from "./types";

export const getLeaders = async (db): Promise<Leader[]> => {
    const collection = await db.collection('leaders').get();
    return collection.docs.map((item) => {
        return item.data() as Leader;
    });
}

export const createLeader = async (db, data: Leader) => {
    return await db.collection('leaders')
        .doc(data.deviceId)
        .set(data)
};

// createLeader({
//     device: "galaxy h",
//     gameId: "hangman",
//     name: "testing name",
//     os: 'android',
//     scores: 0,
//     deviceId: '234wfwef',
//     lang: 'ru'
// });
