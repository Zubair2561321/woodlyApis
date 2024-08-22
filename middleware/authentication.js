const jwt = require("jsonwebtoken");
const { Member } = require("../models/members");
const { AdminUser } = require("../models/admin_users");

const authentication = async (req, res, next, auth) => {
  const token = req.header("x-sh-auth");

  if (!token) {
    return res.status(401).json({
      code: 401,
      message: "Access denied .... No token Provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = decoded;
    let user_id = req.user._id;
    let login_by = req.user.login_by;

    if (!auth.includes(login_by)) {
      return res.status(401).json({
        code: 401,
        message: "Access denied .... Unauthorized User",
      });
    }

    let customer = null;
    if (login_by === "member_user") {
      customer = await Member.findById(user_id);
    } else if (login_by === "admin_user") {
      customer = await AdminUser.findById(user_id);
    }

    if (!customer) {
      return res.status(401).json({
        code: 401,
        message: "Access denied .... Unauthorized User",
      });
    }

    req.customer = customer;
    next();
  } catch (ex) {
    return res.status(401).json({
      code: 401,
      message: "Invalid Token",
    });
  }
};

module.exports = { authentication };
