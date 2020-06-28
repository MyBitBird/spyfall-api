const { Room } = require("../models/room");

const create = async (player) => {
  const room = new Room({ players: [{ name: player.name }] });
  const result = await room.save();
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

module.exports = { create, join , findByCode};
