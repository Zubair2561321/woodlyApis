const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const add_service = require("../controllers/services/add_service");
const services_list = require("../controllers/services/services_list");
const service_detail = require("../controllers/services/service_detail");
const update_service = require("../controllers/services/update_service");
const delete_service = require("../controllers/services/delete_service");

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "post",
  api_function: add_service,
});

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "get",
  api_function: services_list,
});

register_routes({
  router,
  route: "/:service_id",
  auth: ["admin_user"],
  method: "put",
  api_function: update_service,
});

register_routes({
  router,
  route: "/:service_id",
  auth: ["admin_user"],
  method: "get",
  api_function: service_detail,
});

register_routes({
  router,
  route: "/:service_id",
  auth: ["admin_user"],
  method: "delete",
  api_function: delete_service,
});

module.exports = router;
