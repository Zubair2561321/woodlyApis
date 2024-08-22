const { Member } = require("../../models/members");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const members_list = async (req, res) => {
  try {
    var members = await Member.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      code: 200,
      message: "Members List",
      members: members,
    });
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = members_list;
