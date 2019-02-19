const { Router } = require('express');

const router = Router();
const {
  getPlayerInfo,
  getPlayers,
  newPlayer,
  updatePlayerInfo,
  deletePlayer,
} = require('./controller');


// GET routes
router.get('/player/:username', getPlayerInfo);
router.get('/players/', getPlayers);

// POST route
router.post('/player', newPlayer);

// PUT/PATCH route
router.put('/player/:_id', updatePlayerInfo);

// DELETE route
router.delete('/player/:_id', deletePlayer);

module.exports = router;
