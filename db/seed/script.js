const { MongoClient } = require('mongodb');
const assert = require('assert');

const players = require('./sampleData');
require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/sheldon';

(async () => {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const db = client.db();

    // get the old collection if it exists

    const oldCollection = await db.collection('players');

    if (oldCollection) {
      // delete it. well make a new one  
      await db.dropCollection('players');
    }

    // make new players collection and seed it with data
    const r = await db.collection('players').insertMany(players);

    // make sure the count is correct
    assert.equal(6, r.insertedCount);

  } catch (err) {
    console.log(err.stack);
  }

  client.close();
})();