const { Property } = require("../../models/properties");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_property = async (req, res) => {
  try {
    var property = await Property.findByIdAndDelete(req.params.property_id);
    if (property) {
      res.status(200).json({
        code: 200,
        message: "Property Deleted Successfully",
        property: property,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_property;
