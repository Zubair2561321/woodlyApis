const { PropertyType } = require("../../models/property_types");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_property_type = async (req, res) => {
  try {
    var property_type = await PropertyType.findByIdAndDelete(
      req.params.property_type_id
    );
    if (property_type) {
      res.status(200).json({
        code: 200,
        message: "Property Type Deleted Successfully",
        property_type: property_type,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_property_type;
