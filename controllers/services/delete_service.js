const { Service } = require("../../models/services");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_service = async (req, res) => {
  try {
    var service = await Service.findByIdAndDelete(req.params.service_id);
    if (service) {
      res.status(200).json({
        code: 200,
        message: "Service Deleted Successfully",
        service: service,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_service;
