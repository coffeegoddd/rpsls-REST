const http = require('http');
const app = require('./app');

require('dotenv').config();

const port = process.env.PORT || 6200;

const server = http.createServer(app);

server.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('successfully listening on port,', port);
  }
});
server.on('error', (err) => {
  console.log(err);
});
