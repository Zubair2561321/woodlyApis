const {
  AdminUser,
  validateAdminUserLogin,
} = require("../../models/admin_users");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login_admin_user = async (req, res) => {
  try {
    //validate login Request Body
    const { error } = validateAdminUserLogin(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    //check Admin User Exist against this email
    let admin_user = await AdminUser.findOne({
      email: req.body.email,
      status: true,
    });
    if (!admin_user) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }

    // Match Password
    const valid_password = await bcrypt.compare(
      req.body.password,
      admin_user.password
    );
    if (!valid_password) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }

    //Genrate Authentication Token
    const token = jwt.sign(
      { _id: admin_user._id, login_by: "admin_user" },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      code: 200,
      message: "Admin logged in successfully",
      admin_user: admin_user,
      token: token,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = login_admin_user;
