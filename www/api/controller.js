const mongoUtil = require('../../db/index');
const {
  getPlayerInfo,
  getAllPlayers,
  createPlayer,
  updatePlayerInfo,
  deletePlayer,
} = require('../../db/dbHelpers');

module.exports = {
  getPlayerInfo: async (req, res) => {
    const { username } = req.params;
    const db = mongoUtil.getDb();
    const players = db.collection('players');
    const data = await getPlayerInfo(username, players);
    res.status(200).send(data);
  },
  getPlayers: async (req, res) => {
    const db = mongoUtil.getDb();
    const players = db.collection('players');
    const data = await getAllPlayers(players);
    res.status(200).send(data);
  },
  newPlayer: async (req, res) => {
    const newPlayer = req.body;
    const db = mongoUtil.getDb();
    const players = db.collection('players');
    await createPlayer(newPlayer, players);
    res.status(201).send('account created!');
  },
  updatePlayerInfo: async (req, res) => {
    const { _id } = req.params;
    const updatedPlayerInfo = req.body;
    const db = mongoUtil.getDb();
    const players = db.collection('players');
    await updatePlayerInfo(_id, updatedPlayerInfo, players);
    res.status(202).send('player info updated!');
  },
  deletePlayer: async (req, res) => {
    const { _id } = req.params;
    const db = mongoUtil.getDb();
    const players = db.collection('players');
    await deletePlayer(_id, players);
    res.status(202).send('account deleted!');
  },
};
