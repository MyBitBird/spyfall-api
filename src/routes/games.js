const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth");
const service = require("../services/game");
const roomService = require("../services/room");
const events = require("../websocket/events");
const language = require('../midleware/language')

router.post("/", [auth,language], async (req, res) => {
  const room = await roomService.findById(req.roomId);
  const game = await service.startGame(room , req.language);

  events.onGameStarted(room._id, game._id);
  res.status(200).send();
});

router.get("/locations/",language, (req, res) => {
  const local = require(`../local/${req.language}`);
    return res.status(200).send(local.places);
  });
  
router.get("/:id", [auth,language], async (req, res) => {
  const local = require(`../local/${req.language}`);
  const game = await service.findById(req.params.id);
  if (req.playerId == game.spyId) return res.status(200).send(local.spy);
  return res.status(200).send(game.location);
});



module.exports = router;
