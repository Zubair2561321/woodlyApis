const { validateService, Service } = require("../../models/services");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const add_service = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateService(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ code: 400, message: "Image is required" });
    }

    let image = req.files.image;
    let image_dir = "uploads/service/";
    let file_name = image_dir + new Date().getTime() + "_" + image.name;
    UPLOAD_IMAGE_ON_SERVER(image, image_dir, file_name);

    //Create New IsService
    let newService = new Service({
      title: req.body.title,
      status: req.body.status,
      short_description: req.body.short_description,
      detail_description: req.body.detail_description,
      image: file_name,
    });

    newService = await newService.save();
    res.status(200).json({
      code: 200,
      message: "Service Added successfully",
      service: newService,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_service;
