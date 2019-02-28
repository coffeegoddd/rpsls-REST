const assert = require('assert');
const io = require('./game');

require('dotenv').config();

const port = process.env.PORT || 6000;

io.listen(port, (err) => {
  assert.equal(null, err);
  console.log('SUCCESS! socket-server connected on port', port);
});
io.on('error', (err) => {
  console.error(err);
});


// io.sockets.on('connection', (socket) => {
//   console.log('A player has connected');
// });


// below is an alternative instantiation of the socket-server
// I'm using the architecture above in an attempt to modularize the
// socket server better, keeping the socket/game logic in game.js

// const http = require('http');
// const socketIO = require('socket.io');
// const server = http.createServer();
// const io = socketIO(server);
// server.listen(port, (err) => {
//   assert.equal(null, err);
//   console.log('SUCCESS! socket-server connected on port', port);
// });
// server.on('error', (err) => {
//   console.error(err);
// });
