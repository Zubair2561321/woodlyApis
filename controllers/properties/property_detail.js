const { Property } = require("../../models/properties");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const property_detail = async (req, res) => {
  try {
    //Check for ID exist or not
    var property = await Property.findById(req.params.property_id);
    if (!property) {
      return res.status(400).json({
        code: 400,
        message: "No Property exists with given ID",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Property Detail",
      property: property,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = property_detail;
