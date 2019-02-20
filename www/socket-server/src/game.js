const http = require('http');
const socketIO = require('socket.io');
const AllPlayers = require('./utils/allPlayers');

const server = http.createServer();

const io = socketIO(server);


// game logic defined below

// create a new place to store all the players
const lobby = new AllPlayers();

io.sockets.on('connection', (socket) => {
  console.log('A player has connected');

  // gather the info about the connected player
  socket.emit('getNewPlayerInfo', {
    socketId: socket.client.id,
    message: 'Welcome new player!',
  });

  // handle the player information that comes back
  socket.on('playerInfo', (playerInfo) => {
    console.log('from client -->', playerInfo);

    // add player to the queue
    lobby.enQ(playerInfo);

    // addPlayersFromQ
    lobby.addPlayersFromQ();

    // send the client her playerNumber
    const { playerNumber } = playerInfo;
    const queue = lobby.current();

    // the client her number in the queue
    socket.emit('enableReadyButton', {
      playerNumber,
      queue,
    });
  });
});

module.exports = io;
