const dotenv = require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const dbconnect = require("./server/config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
console.log(process.env.DATABASE);
const app = express();

dbconnect();
//middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.default.create({
      mongoUrl: process.env.DATABASE,
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.static("public"));

//templating engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//
app.use("/", require("./server/routes/main"));
app.use("/", require("./server/routes/admin"));

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`The server is running on port no:${port}`);
});
