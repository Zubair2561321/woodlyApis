const { validateCompany, Company } = require("../../models/companies");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const add_company = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateCompany(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({ code: 400, message: "Image is required" });
    }

    let image = req.files.image;
    let image_dir = "uploads/company/";
    let file_name = image_dir + new Date().getTime() + "_" + image.name;
    UPLOAD_IMAGE_ON_SERVER(image, image_dir, file_name);

    //Create New Iscompany
    let newCompany = new Company({
      title: req.body.title,
      status: req.body.status,
      short_description: req.body.short_description,
      detail_description: req.body.detail_description,
      image: file_name,
    });

    newCompany = await newCompany.save();
    res.status(200).json({
      code: 200,
      message: "Company Added successfully",
      company: newCompany,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_company;
