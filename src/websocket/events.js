const { send } = require("./index");
const roomService = require("../services/room");

const EVENTS = {
  playersChanged: "playersChanged",
  gameStarted : "gameStarted"
};

const onRoomPlayersChanged = async (roomId) => {
  send(
    roomId,
    EVENTS.playersChanged,
    (await roomService.findById(roomId)).players
  );
};

const onGameStarted = (roomId, gameId) => {
  send(roomId, EVENTS.gameStarted, { gameId: gameId });
};

module.exports = {
  onRoomPlayersChanged,onGameStarted
};
