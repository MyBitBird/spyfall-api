const rooms = require('./rooms');
const games = require('./games');
const express = require('express');

const routes = (app) =>
{
    app.use(express.json());
    app.use('/api/rooms/' , rooms);
    app.use('/api/games' , games);
}

module.exports = routes;