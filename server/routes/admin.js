const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Post = require("./../models/post");
const User = require("./../models/user");

const adminLayout = "../views/layouts/admin";
const router = express.Router();

// auth middlware to protect route

const authmiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "unauthorized" });
  }
};

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

/**
 * Post
 * admin- check login
 */

router.post("/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

router.get("/dashboard", authmiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Dashbooard",
      description: "A simple blog made using nodejs express and mongodb",
    };

    const data = await Post.find();
    res.render("admin/dashboard", { layouts: "adminLayout", locals, data });
  } catch (error) {
    res.send(error);
  }
});

/**
 * get
 * admin-  add-post
 */

router.get("/add-post", authmiddleware, async (req, res) => {
  try {
    const locals = {
      title: "Add post",
      description: "Simple Blog created with NodeJs, Express & mongoDb",
    };
    const data = await Post.find();
    res.render("admin/add-post", {
      locals,
      layouts: "adminLayout",
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * Post
 * admin-  create new post
 */

router.post("/add-post", authmiddleware, async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
    });
    await Post.create(newPost);
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
});

/**
 * Post
 * admin-  register
 */

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.create({ username, password: hashedPassword });
      res.status(201).json({ message: "User created Sucessfully", user });
    } catch (error) {
      if (error.code === 11000) {
        res.status(409).json({ message: "user already registerd" });
      }
      res.status(500).json({ message: "internal server error" });
    }
    res.render("admin/index", {
      layouts: "adminLayout",
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
