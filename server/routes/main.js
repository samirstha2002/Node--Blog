const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.send("Helloe World");
});

module.exports = router;
