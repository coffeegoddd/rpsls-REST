const express = require('express');
const parser = require('body-parser');
const path = require('path');

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, '../../client/public/')));


module.exports = app;