const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const add_property = require("../controllers/properties/add_property");
const properties_list = require("../controllers/properties/properties_list");
const property_detail = require("../controllers/properties/property_detail");
const update_property = require("../controllers/properties/update_property");
const delete_property = require("../controllers/properties/delete_property");

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "post",
  api_function: add_property,
});

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "get",
  api_function: properties_list,
});

register_routes({
  router,
  route: "/:property_id",
  auth: ["admin_user"],
  method: "put",
  api_function: update_property,
});

register_routes({
  router,
  route: "/:property_id",
  auth: ["admin_user"],
  method: "get",
  api_function: property_detail,
});

register_routes({
  router,
  route: "/:property_id",
  auth: ["admin_user"],
  method: "delete",
  api_function: delete_property,
});

module.exports = router;
