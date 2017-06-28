'use strict';

const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = ('mongoose');


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGOD_URI);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(require('../route/list-router,js'));

app.all('/api/*', (req, res, next) => {
  res.sendStatus(404);
});
app.use(require('./error-middleware.js'));

const server = module.exports = {};
server.isON = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        console.log('server down');
        resolve();
      });
    }
    reject(new Error('the server is not running'));
  });
};