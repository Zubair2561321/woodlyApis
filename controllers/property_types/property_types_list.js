const { PropertyType } = require("../../models/property_types");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const property_types_list = async (req, res) => {
  try {
    var property_types = await PropertyType.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Property Types List",
      property_types: property_types,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = property_types_list;
