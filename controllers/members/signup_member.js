const { validateMember, Member } = require("../../models/members");
const {
  RENDER_BAD_REQUEST,
  UPLOAD_IMAGE_ON_SERVER,
} = require("../common/utils");
const bcrypt = require("bcryptjs");

const signup_member = async (req, res) => {
  try {
    // validate the request body
    const { error } = validateMember(req.body, "POST");
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
      image_dir = "uploads/member_users/";
      file_name = image_dir + new Date().getTime() + "_" + profile_image.name;
      UPLOAD_IMAGE_ON_SERVER(profile_image, image_dir, file_name);
    }

    // check duplication for email
    const existing_member = await Member.findOne({ email: req.body.email });
    if (existing_member) {
      return res
        .status(400)
        .json({ code: 400, message: "Member with same email already exists" });
    }

    //Create New Membe User
    let member_user = new Member({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      status: req.body.status,
      profile_image: file_name,
    });

    const salt = await bcrypt.genSalt(10);
    member_user.password = await bcrypt.hash(req.body.password, salt);
    member_user = await member_user.save();
    res.status(200).json({
      code: 200,
      message: "Registered successfully",
      member_user: member_user,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = signup_member;
