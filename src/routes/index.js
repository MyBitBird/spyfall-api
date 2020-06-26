const rooms = require('./rooms');
const games = require('./games');

const routes = (app) =>
{
    app.use('/api/rooms' , rooms);
    app.use('/api/games' , games);
}

module.exports = routes;