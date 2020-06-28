const { Room, isValid } = require("../models/room");

const create = async (player) => {
  const validation = isValid(player);
  if (validation.result) return validation;

  const room = new Room({ players: [{ name: player.name }] });
  const result = await room.save();
  return { code: 200, result: result };
};

const join = async (code, player) => {
  const validation = isValid(player);
  if (validation.result) return validation;

  const room = await Room.findOne({ code: code });
  if (!room) return { code: 404, result: "Room not found" };
  room.players.push(player);
  const res = await room.save();
  return res;
};

module.exports = { create, join };
