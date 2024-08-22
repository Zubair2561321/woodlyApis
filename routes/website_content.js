const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const update_website_content = require("../controllers/website_content/update_content");
const get_website_content = require("../controllers/website_content/get_website_content");

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "put",
  api_function: update_website_content,
});

register_routes({
  router,
  route: "/",
  method: "get",
  api_function: get_website_content,
});

module.exports = router;
