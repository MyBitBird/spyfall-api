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
  res.status(200).send(mapToDto(result));
});

router.patch("/:code", async (req, res) => {
  const validation = isValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const room = await service.findByCode(req.params.code);
  if (!room) return res.status(404).send("Room Not Found");

  const result = await service.join(room, req.body);
  res.status(200).send(mapToDto(result));
});

const mapToDto = result => {
  const dto = _.pick(result, ["_id", "code"]);
  return { ...dto, playerId: result.players[result.players.length - 1]._id };
};

module.exports = router;
