const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const _ = require("lodash");
const Joi = require("joi");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
    trim: true,
    lowercase: true,
  },
  profile_image: {},
  status: {
    type: Boolean,
    default: true,
  },
  verification_code: {
    type: String,
    trim: true,
    default: "",
  },
  is_send_code: {
    type: Boolean,
    default: false,
  },
  is_verified_code: {
    type: Boolean,
    default: false,
  },
});

memberSchema.plugin(timestamps);

memberSchema.methods.toJSON = function () {
  const memberUser = this;
  const memberUserObject = memberUser.toObject();
  const memberUserJson = _.pick(memberUserObject, [
    "_id",
    "name",
    "email",
    "role",
    "status",
    "profile_image",
    "verification_code",
    "is_send_code",
    "is_verified_code",
    "is_online",
    "last_meeting_id",
    "createdAt",
    "updatedAt",
  ]);
  return memberUserJson;
};

memberSchema.statics.findByEmail = function (email) {
  const member_user = this;
  return member_user.findOne({ email: email });
};

function validateMember(data, method) {
  let schema = Joi.object({
    name: Joi.string().min(5).max(50).required().trim(),
    email: Joi.string().required().email().trim(),
    status: Joi.boolean(),
    profile_image: Joi.object(),
    verification_code: Joi.string().trim(),
    is_send_code: Joi.boolean(),
    is_verified_code: Joi.boolean(),
  });

  const schemaWithPassword = schema.keys({
    password: Joi.string().min(5).max(25).required().trim(),
  });

  if (method == "POST") {
    schema = schemaWithPassword;
  }

  return schema.validate(data);
}

function validateMemberLogin(data) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(data);
}

function validateChangePassword(data) {
  const schema = Joi.object({
    new_password: Joi.string().min(5).max(255).required(),
    confirm_password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(data);
}

const memberUser = mongoose.model("memberUser", memberSchema);
exports.Member = memberUser;
exports.validateMember = validateMember;
exports.validateMemberLogin = validateMemberLogin;
exports.validateChangePassword = validateChangePassword;
