const { ObjectId } = require('mongodb');
const assert = require('assert');

module.exports = {
  getPlayerInfo: async (username, collection) => {
    const data = await collection.findOne({ username });
    return data;
  },
  getAllPlayers: async (collection) => {
    const data = await collection.find({}).toArray();
    return data;
  },
  createPlayer: async (newPlayer, collection) => {
    const data = await collection.insertOne(newPlayer, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.insertedCount);
    });
    return data;
  },
  updatePlayerInfo: async (idString, newPlayerInfo, collection) => {
    const data = await collection.updateOne({
      _id: ObjectId(idString),
    },
    {
      $set: newPlayerInfo,
    }, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.matchedCount);
      assert.equal(1, result.modifiedCount);
    });
    return data;
  },
  deletePlayer: async (_id, collection) => {
    const data = await collection.deleteOne({ _id }, (err, result) => {
      assert.equal(null, err);
      assert.equal(1, result.deletedCount);
    });
    return data;
  },
};
