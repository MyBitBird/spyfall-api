const mongooee = require("mongoose");

const locationSchema = new mongooee.Schema({
  title: { type: String },
  image: { type: String },
});

const Game = mongooee.model(
  "game",
  new mongooee.Schema({
    roomId: { type: mongooee.Types.ObjectId, require },
    location: locationSchema,
    players: { type: Number },
    spyId: { type: mongooee.Types.ObjectId, require },
  })
);

module.exports = Game;
