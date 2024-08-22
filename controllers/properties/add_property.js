const { validateProperty, Property } = require("../../models/properties");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const add_property = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateProperty(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    //Create New Isproperty
    let newProperty = new Property({
      title: req.body.title,
      status: req.body.status,
      short_description: req.body.short_description,
      detail_description: req.body.detail_description,
      total_beds: req.body.total_beds,
      min_price: req.body.min_price,
      max_price: req.body.max_price,
      images: req.body.images,
    });

    newProperty = await newProperty.save();
    res.status(200).json({
      code: 200,
      message: "Property Added successfully",
      property: newProperty,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_property;
