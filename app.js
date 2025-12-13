const dotenv = require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const app = express();

//middleware
app.use(express.static("public"));

//templating engine

app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

//
app.use("/", require("./server/routes/main"));

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log(`The server is running on port no:${port}`);
});

