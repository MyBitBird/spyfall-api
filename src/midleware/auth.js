const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).send("Access Denied!");

  try {
    const payload = jwt.verify(token, config.tokenSecretKey);
    req.playerId = payload._id;
    req.roomId = payload.roomId;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token.");
  }
};
