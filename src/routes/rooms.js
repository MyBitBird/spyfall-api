const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { isValid } = require("../models/room");
const service = require("../services/room");

router.post("/", async (req, res) => {
  const validation = isValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const result = await service.create(req.body);
  const player = result.players[result.players.length - 1];
  res
    .header("x-auth-key", player.generateToken())
    .status(200)
    .send(mapToDto(result));
});

router.patch("/:code", async (req, res) => {
  const validation = isValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const room = await service.findByCode(req.params.code);
  if (!room) return res.status(404).send("Room Not Found");

  const result = await service.join(room, req.body);
  const player = result.players[result.players.length - 1];
  res
    .header("x-auth-key", player.generateToken())
    .status(200)
    .send(mapToDto(result));
});

const mapToDto = (result) => {
  return _.pick(result, ["_id", "code"]);
};

module.exports = router;
