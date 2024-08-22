const express = require("express");
const router = express.Router();
const add_admin_user = require("../controllers/admin_users/add_admin_user");
const login_admin_user = require("../controllers/admin_users/login_admin_user");
const change_password = require("../controllers/admin_users/change_password");
const update_profile = require("../controllers/admin_users/update_profile");
const { register_routes } = require("../utils/register_routes");
const admin_init = require("../controllers/admin_users/admin_init");

register_routes({
  router,
  route: "/",
  method: "post",
  api_function: add_admin_user,
});

register_routes({
  router,
  route: "/admin_init",
  auth: ["admin_user"],
  method: "get",
  api_function: admin_init,
});

register_routes({
  router,
  route: "/admin_login",
  method: "post",
  api_function: login_admin_user,
});

register_routes({
  router,
  route: "/change_password",
  auth: ["admin_user"],
  method: "post",
  api_function: change_password,
});

register_routes({
  router,
  route: "/update_profile",
  auth: ["admin_user"],
  method: "post",
  api_function: update_profile,
});

module.exports = router;
