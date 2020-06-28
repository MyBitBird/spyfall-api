const mongoose = require("mongoose");
const {generateCode} = require('../utils')
const players = mongoose.Schema({
  name: { type: String, require, min: 3, max: 50 },
});

const Model = mongoose.model(
  "rooms",
  new mongoose.Schema({
    code: {type: String  , default: generateCode(5)},
    players: [players]
  })
);

module.exports = Model;
