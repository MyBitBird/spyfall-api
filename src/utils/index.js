const local = require("../local");

const generateCode = (length) => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const selectRandomLocation = () => {
  const placeIndex = Math.floor(Math.random() * local.places.length);
  return local.places[placeIndex];
};

const selectRanomSpyPlayer = (players) => {
  const spyIndex = Math.floor(Math.random() * players.length);
  return players[spyIndex];
};

module.exports = { generateCode, selectRandomLocation, selectRanomSpyPlayer };
