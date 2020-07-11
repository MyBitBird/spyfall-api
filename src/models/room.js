const mongoose = require("mongoose");
const { generateCode } = require("../utils");
const Joi = require("@hapi/joi");
const playerSchema = require("./player");

const Model = mongoose.model(
  "rooms",
  new mongoose.Schema({
    code: { type: String, default: () => generateCode(5) },
    players: [playerSchema],
  })
);

const isValid = (player) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
  });

  return schema.validate(player);
};

module.exports = { Room: Model, isValid };
