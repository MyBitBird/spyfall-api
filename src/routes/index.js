const rooms = require('./rooms');
const games = require('./games');
const express = require('express');
const cordPolicy = require('../midleware/cors')

const routes = (app) =>
{
    app.use(express.json());
    app.use(cordPolicy);
    app.use('/api/rooms/' , rooms);
    app.use('/api/games/' , games);
}

module.exports = routes;