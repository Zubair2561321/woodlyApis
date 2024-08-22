const { validateMemberLogin, Member } = require("../../models/members");
const { RENDER_BAD_REQUEST } = require("../common/utils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login_member_user = async (req, res) => {
  try {
    //validate login Request Body
    const { error } = validateMemberLogin(req.body);
    if (error) {
      return res.status(400).json({
        code: 400,
        message: error.details[0].message.replace(/\"/g, ""),
      });
    }

    //check Member User Exist against this email
    let member_user = await Member.findOne({
      email: req.body.email,
      status: true,
    });
    if (!member_user) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }

    // Match Password
    const valid_password = await bcrypt.compare(
      req.body.password,
      member_user.password
    );
    if (!valid_password) {
      return res
        .status(400)
        .json({ code: 400, message: "Invalid email or password" });
    }

    //Genrate Authentication Token
    const token = jwt.sign(
      { _id: member_user._id, login_by: "member_user" },
      process.env.JWT_SECRET
    );
    res.status(200).json({
      code: 200,
      message: "Member logged in successfully",
      member_user: member_user,
      token: token,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = login_member_user;
