const { Company } = require("../../models/companies");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_company = async (req, res) => {
  try {
    var company = await Company.findByIdAndDelete(req.params.company_id);
    if (company) {
      res.status(200).json({
        code: 200,
        message: "Company Deleted Successfully",
        company: company,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_company;
