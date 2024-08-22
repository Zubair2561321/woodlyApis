const { Company } = require("../../models/companies");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const companies_list = async (req, res) => {
  try {
    var companies = await Company.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Companies List",
      companies: companies,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = companies_list;
