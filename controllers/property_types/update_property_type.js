const {
  validatePropertyType,
  PropertyType,
} = require("../../models/property_types");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_property_type = async (req, res) => {
  try {
    // validate the request body
    const { error } = validatePropertyType(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_property_type = await PropertyType.findById(
      req.params.property_type_id
    );
    if (!existing_property_type) {
      return res
        .status(400)
        .json({ code: 400, message: "Data not found with given ID" });
    }

    let file_name = existing_property_type.image;
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

    existing_property_type.title = req.body.title;
    existing_property_type.short_description = req.body.short_description;
    existing_property_type.detail_description = req.body.detail_description;
    existing_property_type.status = req.body.status;
    existing_property_type.image = file_name;
    await existing_property_type.save();

    res.status(200).json({
      code: 200,
      message: "Property Type Updated successfully",
      property_type: existing_property_type,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_property_type;
