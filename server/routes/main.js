const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  const locals = {
    title: "Node-Blog",
    description: "A simple blog made using nodejs express and mongodb",
  };
  res.render("index", { locals });
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
