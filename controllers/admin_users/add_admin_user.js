const { AdminUser, validateAdminUser } = require("../../models/admin_users");
const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");
const bcrypt = require("bcryptjs");

const add_admin_user = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateAdminUser(req.body, "POST");
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    let file_name = "";

    if (
      req.files !== null &&
      req.files !== undefined &&
      req.files !== "" &&
      req.files.profile_image !== null &&
      req.files.profile_image !== undefined &&
      req.files.profile_image !== ""
    ) {
      profile_image = req.files.profile_image;
      image_dir = "uploads/admin_users/";
      file_name = image_dir + new Date().getTime() + "_" + profile_image.name;
      UPLOAD_IMAGE_ON_SERVER(profile_image, image_dir, file_name);
    }

    // check duplication for email
    const existing_admin = await AdminUser.findOne({ email: req.body.email });
    if (existing_admin) {
      return res
        .status(400)
        .json({ code: 400, message: "Admin with same email already exists" });
    }

    //Create New Admin User
    let admin_user = new AdminUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      profile_image: file_name,
    });

    const salt = await bcrypt.genSalt(10);
    admin_user.password = await bcrypt.hash(req.body.password, salt);
    admin_user = await admin_user.save();
    res.status(200).json({
      code: 200,
      message: "Admin Added successfully",
      admin_user: admin_user,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = add_admin_user;
