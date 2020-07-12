const { send } = require("./index");
const roomService = require("../services/room");

const EVENTS = {
  playersChanged: "playersChanged",
};

const onRoomPlayersChanged = async (roomId) => {
        console.log('room is',await roomService.findById(roomId))
  send(
    roomId,
    EVENTS.playersChanged,
    (await roomService.findById(roomId)).players
  );
};

module.exports = {
  onRoomPlayersChanged,
};
