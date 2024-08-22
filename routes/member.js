const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const add_member = require("../controllers/members/add_member");
const signup_member = require("../controllers/members/signup_member");
const login_member_user = require("../controllers/members/login_member_user");
const members_list = require("../controllers/members/members_list");
const member_detail = require("../controllers/members/member_detail");
const update_member = require("../controllers/members/update_member");
const delete_member = require("../controllers/members/delete_member");
const change_member_password = require("../controllers/members/change_member_password");
const change_password = require("../controllers/members/change_password");
const update_profile = require("../controllers/members/update_profile");

register_routes({
  router,
  route: "/",
  method: "post",
  auth: ["admin_user"],
  api_function: add_member,
});

register_routes({
  router,
  route: "/signup_member",
  method: "post",
  api_function: signup_member,
});

register_routes({
  router,
  route: "/login_member",
  method: "post",
  api_function: login_member_user,
});

register_routes({
  router,
  route: "/:member_id",
  auth: ["admin_user"],
  method: "get",
  api_function: member_detail,
});

register_routes({
  router,
  route: "/:member_id",
  auth: ["admin_user"],
  method: "put",
  api_function: update_member,
});

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "get",
  api_function: members_list,
});

register_routes({
  router,
  route: "/:member_id",
  auth: ["admin_user"],
  method: "delete",
  api_function: delete_member,
});

register_routes({
  router,
  route: "/change_password",
  auth: ["member_user"],
  method: "post",
  api_function: change_password,
});

register_routes({
  router,
  route: "/update_profile",
  auth: ["member_user"],
  method: "post",
  api_function: update_profile,
});

register_routes({
  router,
  route: "/change_member_password/:member_id",
  auth: ["admin_user"],
  method: "post",
  api_function: change_member_password,
});

module.exports = router;
