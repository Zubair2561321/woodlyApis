const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const add_property_type = require("../controllers/property_types/add_property_type");
const property_types_list = require("../controllers/property_types/property_types_list");
const property_type_detail = require("../controllers/property_types/property_type_detail");
const update_property_type = require("../controllers/property_types/update_property_type");
const delete_property_type = require("../controllers/property_types/delete_property_type");

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "post",
  api_function: add_property_type,
});

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "get",
  api_function: property_types_list,
});

register_routes({
  router,
  route: "/:property_type_id",
  auth: ["admin_user"],
  method: "put",
  api_function: update_property_type,
});

register_routes({
  router,
  route: "/:property_type_id",
  auth: ["admin_user"],
  method: "get",
  api_function: property_type_detail,
});

register_routes({
  router,
  route: "/:property_type_id",
  auth: ["admin_user"],
  method: "delete",
  api_function: delete_property_type,
});

module.exports = router;
