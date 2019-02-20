module.exports = {
  playerHasConnected: (socketOrIO) => {
    socketOrIO.emit('newPlayer', {
      message: 'Welcome new player!',
    });
  },
};
