const { Company } = require("../../models/companies");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const company_detail = async (req, res) => {
  try {
    //Check for ID exist or not
    var company = await Company.findById(req.params.company_id);
    if (!company) {
      return res.status(400).json({
        code: 400,
        message: "No company exists with given ID",
      });
    }
    res.status(200).json({
      code: 200,
      message: "Company Detail",
      company: company,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = company_detail;
