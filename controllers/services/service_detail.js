const { Service } = require("../../models/services");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const service_detail = async (req, res) => {
  try {
    //Check for ID exist or not
    var service = await Service.findById(req.params.service_id);
    if (!service) {
      return res.status(400).json({
        code: 400,
        message: "No service exists with given ID",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Service Detail",
      service: service,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = service_detail;
