const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const add_company = require("../controllers/companies/add_company");
const companies_list = require("../controllers/companies/companies_list");
const company_detail = require("../controllers/companies/company_detail");
const update_company = require("../controllers/companies/update_company");
const delete_company = require("../controllers/companies/delete_company");

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "post",
  api_function: add_company,
});

register_routes({
  router,
  route: "/",
  auth: ["admin_user"],
  method: "get",
  api_function: companies_list,
});

register_routes({
  router,
  route: "/:company_id",
  auth: ["admin_user"],
  method: "put",
  api_function: update_company,
});

register_routes({
  router,
  route: "/:company_id",
  auth: ["admin_user"],
  method: "get",
  api_function: company_detail,
});

register_routes({
  router,
  route: "/:company_id",
  auth: ["admin_user"],
  method: "delete",
  api_function: delete_company,
});

module.exports = router;
