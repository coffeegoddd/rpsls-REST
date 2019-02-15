const mongo = require('../connection/mongo');
const data = require('./sampleData');


const runUnitTestsAsync = async () => {
  await mongo(async (db) => {

    // seed the db first with some sample data
    const players = await db.collection('players');
    try {
      await players.insertMany(data);
    } catch (err) {
      console.log('error while seeding for testing -->', err);
    }

    // unit tests will go here...








    console.log('done! removing collection...');
    await db.dropCollection('players');
  });
  console.log('this is the end end');
};

runUnitTestsAsync();
