const mongoose = require("mongoose");
const { generateCode } = require("../utils");
const Joi = require("@hapi/joi");

const players = mongoose.Schema({
  name: { type: String, require, minlength: 3, maxlength: 50 },
});

const Model = mongoose.model(
  "rooms",
  new mongoose.Schema({
    code: { type: String, default: generateCode(5) },
    players: [players],
  })
);

const isValid = (player) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
  });

  const result = schema.validate(player);
  if (result.error)
    return { code: 400, result: result.error.details[0].message };
  return true;
};

module.exports = { Room: Model, isValid };
