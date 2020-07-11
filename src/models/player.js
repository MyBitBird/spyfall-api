const mongoose = require("mongoose");
const config = require("config");
const jwt = require('jsonwebtoken')

const playerSchema = new mongoose.Schema({
    name: { type: String, require, minlength: 3, maxlength: 50 },
  });
  
  playerSchema.methods.generateToken = function () {
    return jwt.sign({ _id: this._id }, config.tokenSecretKey);
  };

  module.exports = playerSchema;