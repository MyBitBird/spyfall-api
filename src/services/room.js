const { Room } = require("../models/room");

const create = async (player) => {
  const room = new Room({ players: [{ name: player.name }] });
  const result = await room.save();
  //console.log('room created',result)
  return result;
};

const findByCode = async (code) => {
  return await Room.findOne({ code: code });
};

const join = async (room, player) => {
  room.players.push(player);
  const res = await room.save();
  return res;
};

const findById = async (roomId) => {
  return await Room.findById(roomId);
};

const getPlayerRoom = async (roomId, playerId) => {
  const room = await Room.findById(roomId);
  if (!room.players.filter((x) => x._id == playerId).length) return null;
  return room;
};

const leaveRoom = async (roomId, playerId) => {
  const room = await getPlayerRoom(roomId, playerId);
  if (!room) return null;
  room.players = room.players.filter((x) => x._id != playerId);
  return await room.save();
};

const removePlayerFromRoom = async (roomId, index) => {
  const room = await findById(roomId);
  if (!room) return null;
  room.players.splice(index, 1);
  return await room.save();
};

module.exports = {
  create,
  join,
  findByCode,
  findById,
  getPlayerRoom,
  leaveRoom,
  removePlayerFromRoom,
};
