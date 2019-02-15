const { MongoClient } = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/sheldon-testing';

const mongoConnection = async (callback) => {
  const client = await new MongoClient(url, {
    useNewUrlParser: true,
    poolSize: 10,
  });

  await client.connect();
  console.log('mongo server ready for testing');

  const db = client.db();

  // pass the live connection to the callback for testing

  try {
    await callback(db);
  } catch (err) {
    console.log('error occured during db testing -->', err);
  }

  console.log('mongo server closing...');
  await client.close();
};

module.exports = mongoConnection;
