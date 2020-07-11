const express = require("express");
const app = express();
const roomService = require("./services/room");
const config = require("config");
const { connect: socketConnect, send } = require("./websocket/");
require("./routes")(app);
require("./db/db")();

const PORT = process.env.PORT || 5500;
const SOCKET_PORT = process.env.socketPort || 2000;

socketConnect(app, SOCKET_PORT, async (roomId) => {
  send(roomId, config.events.playerJoined, (await roomService.findById(roomId)).players);
});

app.listen(PORT, () => {
  console.log(`${PORT} connected...`);
});
