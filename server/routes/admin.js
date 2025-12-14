const express = require("express");
const router = express.Router();
const Post = require("./../models/post");
const User = require("./../models/user");
const adminLayout = "../views/layouts/admin";
/**
 * get
 * admin-login
 */

router.get("/admin", async (req, res) => {
  try {
    const locals = {
      title: "Admin",
      description: "A simple blog made using nodejs express and mongodb",
    };

    res.render("admin/index", {
      locals,
      layouts: "adminLayout",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
