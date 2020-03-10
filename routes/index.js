const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("API Home");
});
module.exports = router;
