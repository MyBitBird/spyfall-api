const mongooee = require("mongoose");

const Game = mongooee.model(
  "game",
  new mongooee.Schema({
    roomId: { type: mongooee.Types.ObjectId, require },
    location: { type: String, require },
    players: {type : Number },
    spyId: { type: mongooee.Types.ObjectId, require },
  })
);

module.exports = Game;
