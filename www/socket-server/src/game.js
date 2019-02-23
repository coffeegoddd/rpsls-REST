const http = require('http');
const socketIO = require('socket.io');
const AllPlayers = require('./utils/allPlayers');

const server = http.createServer();

const io = socketIO(server);


// game logic defined below

// create a new place to store all the players
const lobby = new AllPlayers();

// store the gameTimer to so it can be cleared after the game
let timer;

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
      ready: false,
    });
    io.emit('currentQueue', {
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
      // clear the current readyState
      lobby.clearReadyState();

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

    // send info back to client after 10 secs
    setTimeout((s) => {
      // the client her number in the queue
      s.emit('enableReadyButton', {
        playerNumber,
        ready: false,
      });
      s.emit('currentQueue', {
        queue,
      });
    }, 10000, socket);
  });

  socket.on('playerIsReady', ({ playerNumber, ready }) => {
    // deposit the ready value for each player into the ready state
    lobby[`setR${playerNumber}`] = ready;

    // find out if both are ready
    const start = lobby.bothPlayersReady();
    console.log('ready to start ? -->', start);
    // if they are, start the game!
    if (start) {
      io.emit('startIn5secs', {
        message: 'Start the game for player 1 and 2 in 5secs!',
      });

      // dont forget to wipe the ready state for the next game
      lobby.clearReadyState();
    }
  });

  socket.on('startGame', ({ message }) => {
    // variable representing server-side timer for single source of truth
    let count = 40;

    // send everyone the initial game timer
    setTimeout((IO) => {
      IO.emit('begin');
    }, 5000, io);

    // send everyone the new time every second
    timer = setInterval((IO) => {
      if (count >= 0) {
        IO.emit('decrementGameTimer', {
          gameTimer: count,
        });
        count -= 1;
      }
    }, 1000, io);
  });

  // clear the setInterval after the results are sent to the client
});

module.exports = io;
