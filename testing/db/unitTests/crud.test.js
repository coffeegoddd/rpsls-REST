const { MongoClient } = require('mongodb');
const { dummy, dummies } = require('./sampleData');

const { Isla, Upton, Dennis } = dummy;
// const mongo = require('../connection/mongo');


const url = 'mongodb://localhost:27017/sheldon-testing';
let client;
let players;

describe('Test CRUD methods for REST application', () => {
  beforeAll(async () => {

    // connect to mongo

    client = await new MongoClient(url, {
      useNewUrlParser: true,
      poolSize: 10,
    });

    // connect to db and seed
    try {
      await client.connect();
      const db = await client.db();
      players = await db.collection('players');
      await players.insertMany(dummies);
    } catch (err) {
      console.log('error during test setup -->', err);
    }

  });
  afterAll(async (done) => {
    // await client.dropCollection('players');
    await client.db().dropCollection('players');
    await client.close(done);
  });

  // Test the READ methods

  test('READ --> Testing dbHelper getPlayerInfo', async () => {
    expect.assertions(4);
    const Player = await players.findOne({ username: 'brian' });
    expect(Player).toBeDefined();
    expect(Player.username).toEqual('brian');
    expect(Player._id).toBeDefined();
    expect(Object.keys(Player).length).toEqual(7);
  });
});
