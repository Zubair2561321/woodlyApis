const { validateProperty, Property } = require("../../models/properties");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const update_property = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateProperty(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_property = await Property.findById(req.params.property_id);
    if (!existing_property) {
      return res
        .status(400)
        .json({ code: 400, message: "Data not found with given ID" });
    }

    existing_property.title = req.body.title;
    existing_property.short_description = req.body.short_description;
    existing_property.detail_description = req.body.detail_description;
    existing_property.status = req.body.status;
    existing_property.images = req.body.images;
    existing_property.total_beds = req.body.total_beds;
    existing_property.min_price = req.body.min_price;
    existing_property.max_price = req.body.max_price;

    await existing_property.save();

    res.status(200).json({
      code: 200,
      message: "Property Updated successfully",
      property: existing_property,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_property;
