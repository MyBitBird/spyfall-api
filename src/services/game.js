const Game = require("../models/game");
const { selectRandomLocation, selectRanomSpyPlayer } = require("../utils");

const startGame = async (room) => {
  const game = new Game({
    roomId: room._id,
    players: room.players.length,
    location: selectRandomLocation(),
    spyId: selectRanomSpyPlayer(room.players),
  });

  return await game.save();
};

const findById = async gameId =>
{
    return await Game.findById(gameId)
}

module.exports = {startGame , findById}
