const { MongoClient } = require('mongodb');

require('dotenv').config();

const url = process.env.MONGO_URL || 'mongodb://localhost:27017/sheldon';

let database;

module.exports = {

  // connectToServer is called in the application server
  // it creates a new db connection on application start

  connectToServer: async (callback) => {
    let errFound = null;
    const client = new MongoClient(url, {
      useNewUrlParser: true,
      poolSize: 10,
    });
    try {
      await client.connect();
      console.log('Connected correctly to mongo server');

      const db = client.db();

      // assign connection to variable to be got
      database = db;

    } catch (err) {
      errFound = err.stack;
    }
    return callback(errFound);
  },

  // getDb is called in the api controller to get the current
  // connection to the db

  getDb: () => database,
};
