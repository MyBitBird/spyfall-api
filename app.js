const express = require("express");
const app = express();
const roomService = require("./src/services/room");
const config = require("config");
const { connect, send } = require("./src/websocket");
const events = require('./src/websocket/events')
const helmet = require('helmet');
if(!config.tokenSecretKey)
{
  console.log('ERROR: jwtPrivateToken is not defined.')
  process.exit(1);
}

app.use(helmet())
require("./src/routes")(app);
require("./src/db/db")();

const PORT = process.env.PORT || 5500;
connect(app, PORT, events.onRoomPlayersChanged);

//app.listen(PORT, () => {
//  console.log(`${PORT} connected...`);
//});
