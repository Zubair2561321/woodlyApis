const { Member } = require("../../models/members");
const { RENDER_BAD_REQUEST } = require("../common/utils");

const delete_member = async (req, res) => {
  try {
    //Check for ID exist or not
    var member_user = await Member.findById(req.params.member_id);
    if (!member_user) {
      return res
        .status(400)
        .json({ code: 400, message: "No member exists with given ID" });
    }
    var member_user = await Member.findByIdAndDelete(req.params.member_id);

    if (member_user) {
      res.status(200).json({
        code: 200,
        message: "Member Deleted Successfully",
        member_user: member_user,
      });
    }
  } catch (e) {
    RENDER_BAD_REQUEST(res, e);
  }
};

module.exports = delete_member;
