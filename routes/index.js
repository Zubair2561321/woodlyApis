const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

/****************************
 ******Routes Initialize******
 ****************************/
const running_server = require("./running_server");
const admin_users = require("./admin_users");
const member = require("./member");
const general = require("./general");
const services = require("./services");
const property_types = require("./property_types");
const properties = require("./properties");
const companies = require("./companies");
const website_content = require("./website_content");

module.exports = function (app) {
  /****** Added ********/
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "uploads")));
  app.use(cookieParser());
  app.use(cors());
  app.use(fileUpload());

  /****************************
   *** Routes Use in Express ***
   ****************************/

  app.use("/", running_server);
  app.use("/api/admin_users", admin_users);
  app.use("/api/member", member);
  app.use("/api/general", general);
  app.use("/api/services", services);
  app.use("/api/property_types", property_types);
  app.use("/api/properties", properties);
  app.use("/api/companies", companies);
  app.use("/api/website_content", website_content);
};
