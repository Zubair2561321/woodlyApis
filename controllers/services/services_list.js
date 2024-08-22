const { Service } = require("../../models/services");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const services_list = async (req, res) => {
  try {
    var services = await Service.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Services List",
      services: services,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = services_list;
