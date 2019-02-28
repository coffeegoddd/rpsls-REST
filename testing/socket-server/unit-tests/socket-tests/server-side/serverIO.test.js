const io = require('socket.io-client');
const assert = require('assert');
const server = require('../../../../../www/socket-server/src/game');

const port = 4123;

let socket;

describe('Test the socket server in isolation from the socket client', () => {
  beforeAll((done) => {
    // start the server
    server.listen(port, (err) => {
      assert.equal(null, err);
    });
    done();
  });

  afterAll((done) => {
    socket.disconnect();
    server.close();
    done();
  });

  it('should emit a message and socketId when a client connects', (done) => {
    socket = io.connect(`http://localhost:${port}`);
    socket.on('getNewPlayerInfo', ({ message, socketId }) => {
      expect(message).toBe('Welcome new player!');
      expect(socketId).toBeDefined();
      done();
    });
  });

  // write tests that make sure all emitters are functioning properly
  // and sending the client the correct data shapes/ errors
});
