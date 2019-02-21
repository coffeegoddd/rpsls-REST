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

  // store client info for use during disconnect
  let clientInfo;

  // gather the info about the connected player
  socket.emit('getNewPlayerInfo', {
    socketId: socket.client.id,
    message: 'Welcome new player!',
  });

  // handle the player information that comes back
  socket.on('initialInfo', (playerInfo) => {
    console.log('from client -->', playerInfo);

    // save info in initial info
    clientInfo = playerInfo;

    // add player to the queue
    lobby.enQ(playerInfo);

    // addPlayersFromQ
    lobby.addPlayersFromQ();

    // send the client her playerNumber

    const playerNumber = lobby.amIPlaying(socket.client.id);
    const queue = lobby.current();

    // the client her number in the queue
    socket.emit('enableReadyButton', {
      playerNumber,
    });
    socket.emit('currentQueue', {
      queue,
    });
  });

  socket.on('disconnect', () => {
    // remove player from players and queue
    lobby.removeDisconnector(clientInfo);

    // if player from players disconnected, tell everyone
    if (!lobby.getP1 || !lobby.getP2) {
      io.emit('competitorDisconnected', {
        message: 'Oops! a competitor disconnected. A new game will start in 20 secs.',
      });

      // update the players
      lobby.addPlayersFromQ();

      // get the new queue
      const queue = lobby.current();

      // send everyone the new queue
      io.emit('currentQueue', { queue });

      // in 10 secs tell everyone to send in a playerInfo request
      setTimeout((IO) => {
        IO.emit('sendPlayerInfo', {
          message: 'emit playerInfoSubsequent event due to player disconnection',
        });
      }, 10000, io);
    } else {
      // update the players
      lobby.addPlayersFromQ();

      // get the new queue
      const queue = lobby.current();

      // send everyone the new queue
      io.emit('currentQueue', { queue });
    }
  });

  socket.on('playerInfoSubsequent', (playerInfo) => {
    // make sure client info is accurate
    clientInfo = playerInfo;

    // update players, probably not needed
    lobby.addPlayersFromQ();

    // get clients playerNumber
    const playerNumber = lobby.amIPlaying(socket.client.id);

    // get current queue
    const queue = lobby.current();

    // notify client that game will start in 10 secs
    socket.emit('newGameSoonCome', {
      message: 'A new game is starting in 10 secs!',
    });

    // send info back to client
    setTimeout((s) => {
      // the client her number in the queue
      s.emit('enableReadyButton', {
        playerNumber,
      });
      s.emit('currentQueue', {
        queue,
      });
    }, 10000, socket);
  });
});

module.exports = io;
