const dbHelpers = require('../../db/dbHelpers');

module.exports = {
  getPlayerInfo: (req, res) => {
    res.status(200).send('player info check');
  },
  getPlayers: (req, res) => {
    res.status(200).send('get players check');
  },
  newPlayer: (req, res) => {
    res.status(201).send('new player check');
  },
  updatePlayerInfo: (req, res) => {
    res.status(202).send('update player info check');
  },
  deletePlayer: (req, res) => {
    res.status(202).send('delete player check');
  },
};
