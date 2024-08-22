require("./config/config");
require("./db/mongoose");
const express = require("express");
const path = require("path");
const app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/uploads", express.static("uploads"));
require("./routes")(app);

module.exports = app;
