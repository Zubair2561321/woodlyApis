const {
  validatePropertyType,
  PropertyType,
} = require("../../models/property_types");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const add_property_type = async (req, res) => {
  try {
    // validate the request body
    const { error } = validatePropertyType(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    let file_name = "";
    if (
      req.files !== null &&
      req.files !== undefined &&
      req.files !== "" &&
      req.files.image !== null &&
      req.files.image !== undefined &&
      req.files.image !== ""
    ) {
      image = req.files.image;
      image_dir = "uploads/property_type/";
      file_name = image_dir + new Date().getTime() + "_" + image.name;
      UPLOAD_IMAGE_ON_SERVER(image, image_dir, file_name);
    }
    //Create New Isproperty_type
    let newPropertyType = new PropertyType({
      title: req.body.title,
      status: req.body.status,
      short_description: req.body.short_description,
      detail_description: req.body.detail_description,
      image: file_name,
    });

    newPropertyType = await newPropertyType.save();
    res.status(200).json({
      code: 200,
      message: "Property Type Added successfully",
      property_type: newPropertyType,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_property_type;
