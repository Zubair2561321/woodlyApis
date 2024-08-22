const {
  AdminUser,
  validateUpdatedProfile,
} = require("../../models/admin_users");
const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_profile = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateUpdatedProfile(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_admin = await AdminUser.findById(req.user._id);
    if (!existing_admin) {
      return res
        .status(400)
        .json({ code: 400, message: "Admin User not found" });
    }

    let file_name = existing_admin.profile_image;
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

    let name_updated = false;
    if (existing_admin.name !== req.body.name) {
      name_updated = true;
    }

    existing_admin.name = req.body.name;
    existing_admin.profile_image = file_name;
    const admin_user = await existing_admin.save();

    res.status(200).json({
      code: 200,
      message: "Profile Updated successfully",
      admin_user: existing_admin,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_profile;
