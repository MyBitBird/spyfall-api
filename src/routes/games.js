const express = require("express");
const router = express.Router();
const auth = require("../midleware/auth");
const service = require("../services/game");
const roomService = require("../services/room");
const events = require("../websocket/events");
const local = require("../local");

router.post("/", auth, async (req, res) => {
  const room = await roomService.findById(req.roomId);
  const game = await service.startGame(room);

  events.onGameStarted(room._id, game._id);
  res.status(200).send();
});

router.get("/locations/", (req, res) => {
    console.log("locations", local.places);
    return res.status(200).send(local.places);
  });
  
router.get("/:id", auth, async (req, res) => {
  const game = await service.findById(req.params.id);
  if (req.playerId == game.spyId) return res.status(200).send(local.spy);
  return res.status(200).send(game.location);
});



module.exports = router;
