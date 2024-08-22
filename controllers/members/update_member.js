const { validateMember, Member } = require("../../models/members");

const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");

const update_member = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateMember(req.body, "PUT");
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    const existing_member = await Member.findById(req.params.member_id);
    if (!existing_member) {
      return res
        .status(400)
        .json({ code: 400, message: "Member not found with given ID" });
    }

    const check_duplicate = await Member.findOne({
      email: req.body.email,
      _id: { $ne: req.params.member_id },
    });
    if (check_duplicate) {
      return res
        .status(400)
        .json({ code: 400, message: "Member with same email already exists" });
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
    existing_member.email = req.body.email;
    existing_member.status = req.body.status;
    existing_member.profile_image = file_name;

    const member_user = await existing_member.save();

    res.status(200).json({
      code: 200,
      message: "Member Updated successfully",
      member_user: existing_member,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = update_member;
