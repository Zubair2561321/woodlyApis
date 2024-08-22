const { Property } = require("../../models/properties");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const properties_list = async (req, res) => {
  try {
    var properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Properties List",
      properties: properties,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = properties_list;
