const { validateService, Service } = require("../../models/services");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_service = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateService(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_service = await Service.findById(req.params.service_id);
    if (!existing_service) {
      return res
        .status(400)
        .json({ code: 400, message: "Data not found with given ID" });
    }

    let file_name = existing_service.image;
    if (
      req.files !== null &&
      req.files !== undefined &&
      req.files !== "" &&
      req.files.image !== null &&
      req.files.image !== undefined &&
      req.files.image !== ""
    ) {
      image = req.files.image;
      image_dir = "uploads/service/";
      file_name = image_dir + new Date().getTime() + "_" + image.name;
      UPLOAD_IMAGE_ON_SERVER(image, image_dir, file_name);
    }

    existing_service.title = req.body.title;
    existing_service.short_description = req.body.short_description;
    existing_service.detail_description = req.body.detail_description;
    existing_service.status = req.body.status;
    existing_service.image = file_name;
    await existing_service.save();

    res.status(200).json({
      code: 200,
      message: "Service Updated successfully",
      service: existing_service,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_service;
