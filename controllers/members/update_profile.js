const { validateMember, Member } = require("../../models/members");
const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_profile = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateMember(req.body, "PUT");
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_member = await Member.findById(req.user._id);
    if (!existing_member) {
      return res.status(400).json({ code: 400, message: "Member not found" });
    }

    let file_name = existing_member.profile_image;
    if (
      req.files !== null &&
      req.files !== undefined &&
      req.files !== "" &&
      req.files.profile_image !== null &&
      req.files.profile_image !== undefined &&
      req.files.profile_image !== ""
    ) {
      profile_image = req.files.profile_image;
      image_dir = "uploads/member_users/";
      file_name = image_dir + new Date().getTime() + "_" + profile_image.name;
      UPLOAD_IMAGE_ON_SERVER(profile_image, image_dir, file_name);
    }

    existing_member.name = req.body.name;
    existing_member.profile_image = file_name;
    const member_user = await existing_member.save();

    res.status(200).json({
      code: 200,
      message: "Profile Updated successfully",
      member_user: existing_member,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_profile;
