const express = require("express");
const app = express();
const roomService = require("./services/room");
const config = require("config");
const { connect: socketConnect, send } = require("./websocket/");
const events = require('./websocket/events')

if(!config.tokenSecretKey)
{
  console.log('ERROR: jwtPrivateToken is not defined.')
  process.exit(1);
}

require("./routes")(app);
require("./db/db")();

const PORT = process.env.PORT || 5500;
const SOCKET_PORT = process.env.socketPort || 2000;

socketConnect(app, SOCKET_PORT, events.onRoomPlayersChanged);

app.listen(PORT, () => {
  console.log(`${PORT} connected...`);
});
