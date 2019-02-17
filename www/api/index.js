const http = require('http');
const assert = require('assert');
const app = require('./app');
const mongoUtil = require('../../db/index');

require('dotenv').config();

const port = process.env.PORT || 3001;

const server = http.createServer(app);

mongoUtil.connectToServer((err) => {
  assert.equal(null, err);
  server.listen(port, (err) => {
    assert.equal(null, err);
    console.log('SUCCESS! connected to port', port);
  });
  server.on('error', (err) => {
    console.error('api error -->', err);
  });
});
