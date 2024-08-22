const {
  AdminUser,
  validateChangePassword,
} = require("../../models/admin_users");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");

const change_password = async (req, res) => {
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

    let admin_user = await AdminUser.findById(req.user._id);
    if (!admin_user) {
      return res
        .status(400)
        .json({ code: 400, message: "Admin user not exist" });
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
    admin_user.password = password;
    admin_user = await admin_user.save();

    res.status(200).json({
      code: 200,
      message: "Password updated successfully",
      admin_user: admin_user,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = change_password;
