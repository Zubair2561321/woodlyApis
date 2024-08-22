const { validateChangePassword, Member } = require("../../models/members");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const change_member_password = async (req, res) => {
  try {
    let user_password = "";
    let password = "";

    const { error } = validateChangePassword(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    let member_user = await Member.findById(req.params.member_id);
    if (!member_user) {
      return res.status(400).json({ code: 400, message: "Member not exist" });
    }

    if (req.body.new_password !== req.body.confirm_password) {
      return res.status(400).json({
        code: 400,
        message: "Password should be match with confirm password",
      });
    }

    user_password = req.body.new_password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(user_password, salt);
    member_user.password = password;
    member_user = await member_user.save();

    res.status(200).json({
      code: 200,
      message: "Password updated successfully",
      member_user: member_user,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = change_member_password;
