const http = require('http');
const assert = require('assert');

const app = require('./app');

require('dotenv').config();

const port = process.env.PORT || 3111;

const server = http.createServer(app);

server.listen(port, (err) => {
  assert.equal(null, err);
  console.log('successfully listening on port', port);
});

server.on('error', (err) => {
  console.log('error event emmited -->', err);
});