const express = require('express');
const parser = require('body-parser');
const path = require('path');

const router = require('./router');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));
app.use('/', router);
app.use(express.static(path.join(__dirname, './')));


module.exports = app;
