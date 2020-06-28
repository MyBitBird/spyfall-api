const http = require("http");
const socketClients = [];

module.exports = (app, PORT) => {
  const server = http.createServer(app);
  const socket = require("socket.io")(server);
  socket.on("connected", (socket) => {
    onConnected(socket);
  });

  server.listen(PORT, () => {
    console.log("socket server on ", PORT);
  });
};

const onConnected = (socket) => {
  const roomId = socket.handshake.query.id;
  console.log(" a user connected " + roomId, socket);
  const isExist = socketClients.findIndex((x) => x.roomId === roomId);
  const socketClient = { id: socket.id, roomId: roomId, socket: socket };
  if (isExist >= 0) socketClients.splice(isExist, 1, socketClient);
  else socketClients.push(socketClient);
};
