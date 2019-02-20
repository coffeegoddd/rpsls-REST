const http = require('http');
const socketIO = require('socket.io');

const server = http.createServer();

const io = socketIO(server);

const {
  playerHasConnected,
} = require('./emitters');

// game logic defined below

io.sockets.on('connection', (socket) => {
  console.log('A player has connected');
  playerHasConnected(socket);
});

module.exports = io;
