const express = require("express");
const router = express.Router();
const { register_routes } = require("../utils/register_routes");
const upload_image = require("../controllers/general/upload_image");

register_routes({
  router,
  route: "/upload_image",
  auth: ["admin_user"],
  method: "post",
  api_function: upload_image,
});

module.exports = router;
