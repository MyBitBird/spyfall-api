const http = require("http");
const socketClients = [];

const connect = (app, PORT, callback) => {
  const server = http.createServer(app);
  const socket = require("socket.io")(server);
  
  socket.on("connection", (socket) => {
    onConnected(socket, callback);
    socket.on("disconnect", () => {
      onDisconnected(socket);
    });
  });

  server.listen(PORT, () => {
    console.log("socket server on ", PORT);
  });
};

const onConnected = async (socket, callback) => {
  const joinId = socket.handshake.query.id;
  console.log(" a user connected ", socket.id);

  const isExist = socketClients.findIndex((x) => x.id === socket.id);
  if (isExist >= 0) return; //socketClients.splice(isExist, 1, socketClient);
  
  const socketClient = { id: socket.id, roomId: joinId, socket: socket };
  socketClients.push(socketClient);
  callback(joinId);
};

const onDisconnected = (socket) => {
  console.log(" a user disconnected ", socket.id);
  socket.disconnect();
  const itemIndex = socketClients.findIndex((x) => x.id === socket.id);
  socketClients.splice(itemIndex, 1);
};

const send = (joinId, event, data) => {
  console.log('scoket client is' , socketClients)
  const clients = socketClients.filter((x) => x.roomId == joinId);
  console.log("joinId to send "+joinId, clients);
  if (!clients.length) return false;

  clients.forEach((client) => {
    console.log("send to ", clients.length);
    client.socket.emit(event + joinId, data);
  });
  return true;
};

module.exports = { connect, send };
