const { Company, validateCompany } = require("../../models/companies");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_company = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateCompany(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_company = await Company.findById(req.params.company_id);
    if (!existing_company) {
      return res
        .status(400)
        .json({ code: 400, message: "Data not found with given ID" });
    }

    let file_name = existing_company.image;
    if (
      req.files !== null &&
      req.files !== undefined &&
      req.files !== "" &&
      req.files.image !== null &&
      req.files.image !== undefined &&
      req.files.image !== ""
    ) {
      image = req.files.image;
      image_dir = "uploads/company/";
      file_name = image_dir + new Date().getTime() + "_" + image.name;
      UPLOAD_IMAGE_ON_SERVER(image, image_dir, file_name);
    }

    existing_company.title = req.body.title;
    existing_company.short_description = req.body.short_description;
    existing_company.detail_description = req.body.detail_description;
    existing_company.status = req.body.status;
    existing_company.image = file_name;
    await existing_company.save();

    res.status(200).json({
      code: 200,
      message: "Company Updated successfully",
      company: existing_company,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_company;
