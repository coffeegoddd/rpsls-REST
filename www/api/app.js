// after mvp, enable compression middleware...
// const compression = require('compression');

const express = require('express');
const parser = require('body-parser');

const router = require('./routes');

const app = express();

// app.use(compression());

app.use(parser.json());
app.use(parser.urlencoded({
  extended: true,
}));
app.use('/api', router);

module.exports = app;
