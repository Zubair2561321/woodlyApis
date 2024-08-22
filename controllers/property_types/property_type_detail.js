const { PropertyType } = require("../../models/property_types");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const property_type_detail = async (req, res) => {
  try {
    //Check for ID exist or not
    var property_type = await PropertyType.findById(
      req.params.property_type_id
    );
    if (!property_type) {
      return res.status(400).json({
        code: 400,
        message: "No Property type exists with given ID",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Property Type Detail",
      property_type: property_type,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = property_type_detail;
