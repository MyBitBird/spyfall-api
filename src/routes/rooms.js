const _ = require("lodash");
const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth");
const events = require("../websocket/events");

const { isValid } = require("../models/room");
const service = require("../services/room");

router.post("/", async (req, res) => {
  const validation = isValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const result = await service.create(req.body);
  const player = result.players[result.players.length - 1];
  res.status(200).send(player.generateToken(result._id));
});

router.put("/:code", async (req, res) => {
  const validation = isValid(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  const room = await service.findByCode(req.params.code);
  if (!room) return res.status(404).send("Room Not Found");

  const result = await service.join(room, req.body);
  const player = result.players[result.players.length - 1];
  res.status(200).send(player.generateToken(result._id));
});

router.get("/", auth, async (req, res) => {
  const room = await service.getPlayerRoom(req.roomId, req.playerId);
  if (!room) return res.status(400).send("Room doesn't exist");
  return res.status(200).send(mapToDto(room));
});

router.patch("/leave/", auth, async (req, res) => {
  const result = await service.leaveRoom(req.roomId, req.playerId);
  events.onRoomPlayersChanged(result._id);
  return res.status(200).send();
});

router.patch("/leave/:index", auth, async (req, res) => {
  const result = await service.removePlayerFromRoom(
    req.roomId,
    req.params.index
  );
  events.onRoomPlayersChanged(result._id);
  return res.status(200).send();
});

const mapToDto = (result) => {
  return _.pick(result, ["_id", "code"]);
};
module.exports = router;
