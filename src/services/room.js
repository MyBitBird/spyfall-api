const { Room } = require("../models/room");
const room = require("../models/room");

const create = async (player) => {
  const room = new Room({ players: [{ name: player.name }] });
  const result = await room.save();
  console.log('room created',result)
  return result;
};

const findByCode = async code => {
    return await Room.findOne({ code: code });
}

const join = async (room, player) => {
  room.players.push(player);
  const res = await room.save();
  return res;
};

const findById = async roomId => {
  return await Room.findById(roomId);
}
module.exports = { create, join , findByCode , findById};
