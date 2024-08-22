const { AdminUser } = require("../../models/admin_users");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const admin_init = async (req, res) => {
  try {
    // Check for ID exist or not
    var admin_user = await AdminUser.findOne({
      _id: req.user._id,
    });
    if (!admin_user) {
      return res
        .status(401)
        .json({ code: 400, message: "No Admin exists with given ID" });
    }

    res.status(200).json({
      code: 200,
      message: "Admin Init Detail",
      admin_user: admin_user,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = admin_init;
